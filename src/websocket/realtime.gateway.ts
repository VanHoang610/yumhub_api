import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UploadService } from '../modules/upload/upload.service';

interface ConnectedClient {
  socket: Socket;
  id_user: string;
  type_user: string;
  id_merchant: string;
  tokenNotification: string;
}

interface MessageRow {
  typeUser: string;
  message: string;
  timestamp: Date;
  type_mess: string;
}

interface OrderCurrentProcessing {
  order: string;
  status: string;
}

@WebSocketGateway()
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly uploadService: UploadService) { }

  @WebSocketServer()
  server: Server;

  private customers: ConnectedClient[] = [];
  private shippers: ConnectedClient[] = [];
  private merchants: ConnectedClient[] = [];
  private chatRooms: Map<string, MessageRow[]> = new Map();
  private activeOrders: Map<string, OrderCurrentProcessing> = new Map();

  handleConnection(client: Socket) {
    const { id_user, type_user, id_merchant, tokenNotification } = client.handshake.query;

    const connectedClient: ConnectedClient = {
      socket: client,
      id_user: id_user as string,
      type_user: type_user as string,
      id_merchant: id_merchant as string,
      tokenNotification: tokenNotification as string,
    };

    if (type_user === 'customer') {
      this.customers.push(connectedClient);
    } else if (type_user === 'shipper') {
      this.shippers.push(connectedClient);
    } else if (type_user === 'merchant') {
      this.merchants.push(connectedClient);
    }

    console.log(`${type_user} connected:`, id_user, tokenNotification);
    console.log('list customer: ', this.customers);
    console.log('list shippers: ', this.shippers);
    console.log('list merchants: ', this.merchants);
    console.log(this.findAllClientMerchantById(id_merchant as string).length);

    // Kiểm tra xem người dùng này có đơn hàng nào đang trong tiến trình hay không
    const activeOrder = this.activeOrders.get(id_user as string);
    if (activeOrder) {
      // Gửi lại thông tin đơn hàng cho người dùng
      this.sendMessageToClient(client, 'orderUpdate', activeOrder);
    }

    // Nếu đã có phòng chat cho order này, gửi toàn bộ tin nhắn trước đó cho client mới
    const roomName = this.getRoomNameFromClient(connectedClient);
    if (roomName && this.chatRooms.has(roomName)) {
      this.sendMessageToClient(client, "chat", { orderID: roomName.split('_')[1], fullChat: this.chatRooms.get(roomName) });
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
    this.removeClient(client);
  }

  private removeClient(client: Socket) {
    this.customers = this.customers.filter(c => c.socket.id !== client.id);
    this.shippers = this.shippers.filter(s => s.socket.id !== client.id);
    this.merchants = this.merchants.filter(m => m.socket.id !== client.id);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, @MessageBody() payload: any): void {
    const { type_user, command, order } = payload;
    console.log(`Received message ${command}:`, order);

    switch (command) {
      case 'placeOrder':
        this.handlePlaceOrder(type_user, order);
        break;
      case 'refuse':
        this.handleOrderRefusal(type_user, order);
        break;
      case 'accept':
        this.handleOrderAcceptance(type_user, order);
        break;
      case 'waiting':
      case 'delivering':
      case 'arrived':
      case 'success':
      case 'fake_order':
      case 'cancelled_from_shipper':
      case 'cancelled_from_merchant':
        this.handleOrderStatusUpdate(type_user, command, order);
        break;
      case 'chat':
        this.handleChatMessage(type_user, order, payload.message, payload.type_mess);
        break;
      default:
        console.log('Unknown command:', command);
    }
  }

  private handlePlaceOrder(type_user: string, order: any) {
    this.realTimeTo1Object(type_user, 'placeOrder', order);
    this.sendNotificationToShipper(order.shipperID._id, "Bạn có đơn hàng mới");
    this.activeOrders.set(order.customerID._id, { order: JSON.stringify(order), status: 'placeOrder' });
  }

  private handleOrderRefusal(type_user: string, order: any) {
    this.realTimeTo1Object(type_user, 'refuse', order);
    this.activeOrders.delete(order.customerID._id);
  }

  private handleOrderAcceptance(type_user: string, order: any) {
    this.realTimeTo2Object(type_user, 'accept', order);
    this.sendNotificationToCustomer(order.customerID._id, "Đã có tài xế nhận đơn");
    this.sendNotificationToMerchants(order.merchantID._id, "Bạn có đơn hàng mới");
    this.createChatRoom(order._id, order.customerID._id, order.shipperID._id);
    this.activeOrders.set(order.customerID._id, { order: JSON.stringify(order), status: 'accept' });
  }

  private handleOrderStatusUpdate(type_user: string, command: string, order: any) {
    this.realTimeTo1Object(type_user, command, order);
    this.activeOrders.set(order.customerID._id, { order: JSON.stringify(order), status: command });

    if (command === 'success') {
      setTimeout(() => {
        this.deleteChatRoom(order._id);
      }, 3 * 60 * 60 * 1000); // 3 giờ
      this.activeOrders.delete(order.customerID._id);
    }
  }

  private handleChatMessage(type_user: string, order: any, message: string, type_mess: string) {
    const roomName = `room_${order._id}`;
    if (type_mess !== 'loading') {
      const chatMessage: MessageRow = {
        typeUser: type_user,
        message: message,
        timestamp: new Date(),
        type_mess: type_mess
      };

      if (this.chatRooms.has(roomName)) {
        this.chatRooms.get(roomName).push(chatMessage);
      } else {
        this.chatRooms.set(roomName, [chatMessage]);
      }

      this.broadcastChatMessage(roomName, order._id);
      this.sendChatNotification(type_user, order);
    }
  }

  private broadcastChatMessage(roomName: string, orderId: string) {
    const fullChat = this.chatRooms.get(roomName);
    this.server.to(roomName).emit('chat', { orderID: orderId, fullChat });
  }

  private sendChatNotification(type_user: string, order: any) {
    if (type_user === 'shipper') {
      this.sendNotificationToCustomer(order.customerID._id, "Tin nhắn mới");
    } else {
      this.sendNotificationToShipper(order.shipperID._id, "Tin nhắn mới");
    }
  }

  private sendMessageToClient(client: Socket, command: string, data: any): void {
    client.emit('message', { command, ...data });
  }

  private sendNotificationToCustomer(customerId: string, messageBody: string) {
    const customer = this.findClientById(customerId, 'customer');
    if (customer) {
      this.sendNotification(customer.tokenNotification, messageBody);
    }
  }

  private sendNotificationToShipper(shipperId: string, messageBody: string) {
    const shipper = this.findClientById(shipperId, 'shipper');
    if (shipper) {
      this.sendNotification(shipper.tokenNotification, messageBody);
    }
  }

  private sendNotificationToMerchants(merchantId: string, messageBody: string) {
    const merchantClients = this.findAllClientMerchantById(merchantId);
    merchantClients.forEach(client => {
      this.sendNotification(client.tokenNotification, messageBody);
    });
  }

  private sendNotification(tokenNotification: string, messageBody: string) {
    const message = {
      notification: {
        title: 'YumHub',
        body: messageBody,
      },
      token: tokenNotification,
    };

    this.uploadService.sendNotification(message);
  }

  private findClientById(id_user: string, type_user: string): ConnectedClient | undefined {
    switch (type_user) {
      case 'customer':
        return this.customers.find(client => client.id_user === id_user);
      case 'shipper':
        return this.shippers.find(client => client.id_user === id_user);
      case 'merchant':
        return this.merchants.find(client => client.id_user === id_user);
      default:
        return undefined;
    }
  }

  private findAllClientMerchantById(id_merchant: string): ConnectedClient[] {
    return this.merchants.filter(client => client.id_merchant === id_merchant);
  }

  private getRoomNameFromClient(client: ConnectedClient): string | null {
    const activeOrder = this.activeOrders.get(client.id_user);
    if (activeOrder) {
      return `room_${activeOrder.order}`;
    }
    return null;
  }

  private createChatRoom(orderId: string, customerId: string, shipperId: string): void {
    const roomName = `room_${orderId}`;
    const customer = this.findClientById(customerId, 'customer');
    const shipper = this.findClientById(shipperId, 'shipper');

    if (customer) {
      customer.socket.join(roomName);
    }

    if (shipper) {
      shipper.socket.join(roomName);
    }
  }

  private deleteChatRoom(orderId: string): void {
    const roomName = `room_${orderId}`;
    if (this.chatRooms.has(roomName)) {
      this.chatRooms.delete(roomName);
    }
  }

  private realTimeTo1Object(type_user: string, command: string, order: any): void {
    const shipper = this.findClientById(order.shipperID._id, 'shipper');
    if (shipper) {
      shipper.socket.emit('message', { type_user, command, order });
    }
  }

  private realTimeTo2Object(type_user: string, command: string, order: any): void {
    const customer = this.findClientById(order.customerID._id, 'customer');
    const shipper = this.findClientById(order.shipperID._id, 'shipper');

    if (customer) {
      customer.socket.emit('message', { type_user, command, order });
    }

    if (shipper) {
      shipper.socket.emit('message', { type_user, command, order });
    }
  }
}
