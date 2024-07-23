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
import { log } from 'console';

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

@WebSocketGateway()
export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly uploadService: UploadService) { }
  @WebSocketServer()
  server: Server;

  private customers: ConnectedClient[] = [];
  private shippers: ConnectedClient[] = [];
  private merchants: ConnectedClient[] = [];
  private chatRooms: Map<string, MessageRow[]> = new Map();

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
    console.log(this.findAllClientMerchantById(id_merchant as string).length)
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

  private realTimeTo2Object(type_user_send: string, command: string, order: any) {
    if (type_user_send === "shipper") {
      if (this.findClientById(order.customerID._id, "customer")) {
        this.sendMessageToClient(this.findClientById(order.customerID._id, "customer").socket, command, order);
      } else {
        // có thể xử lý bắn notification trên app customer nếu khách hàng không hoạt động app
      }
      const merchantClients = this.findAllClientMerchantById(order.merchantID._id);
      console.log("list merchant: ", merchantClients);

      if (this.findAllClientMerchantById(order.merchantID._id).length > 0) {
        merchantClients.forEach(client => {
          this.sendMessageToClient(client.socket, command, order);
        })
      }
    } else {

      if (this.findClientById(order.customerID._id, "customer")) {
        this.sendMessageToClient(this.findClientById(order.customerID._id, "customer").socket, command, order);
      } else {
        // có thể xử lý bắn notification trên app customer nếu khách hàng không hoạt động app
      }
      if (this.findClientById(order.shipperID._id, "shipper")) {
        this.sendMessageToClient(this.findClientById(order.shipperID._id, "shipper").socket, command, order);
      } else {
        // có thể xử lý bắn notification trên app merchant nếu khách hàng không hoạt động app
      }
    }
  }
  private realTimeTo1Object(type_user_send: string, command: string, order: any) {
    if (type_user_send === "customer") {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxx1", order.shipperID._id);

      if (this.findClientById(order.shipperID._id, "shipper") !== undefined) {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxx2", order.shipperID._id);
        this.sendMessageToClient(this.findClientById(order.shipperID._id, "shipper").socket, command, order);
        console.log("xxxxxxxxxxxxxxxxxxxxxxxx3", order.shipperID._id);
      } else if (this.findClientById(order.customerID._id, "customer") !== undefined) {
        this.sendMessageToClient(this.findClientById(order.customerID._id, "customer").socket, command, "shipper không hoạt động");
      }
    } else if (type_user_send === "shipper") {
      if (this.findClientById(order.customerID._id, "customer") !== undefined) {
        this.sendMessageToClient(this.findClientById(order.customerID._id, "customer").socket, command, order);
      } else {
        // có thể xử lý bắn notification trên app customer nếu khách hàng không hoạt động app
      }
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, @MessageBody() payload: any): void {
    const { type_user, command, order } = payload;
    console.log(`Received message ${command}:`, order);

    // khách hàng đặt đơn hàng
    if (type_user === "customer" && command === "placeOrder") {
      this.realTimeTo1Object(type_user, command, order);
      this.sendNotication(this.findClientById(order.shipperID._id, "shipper").tokenNotification, "Bạn có đơn hàng mới")
    }
    // shipper từ chối nhận đơn hàng
    if (type_user === "shipper" && command === "refuse") {
      this.realTimeTo1Object(type_user, command, order);
    }
    // shipper xác nhận nhận đơn hàng
    if (type_user === "shipper" && command === "accept") {
      this.realTimeTo2Object(type_user, command, order);
      if (this.findClientById(order.customerID._id, "customer").tokenNotification !== undefined) {
        this.sendNotication(this.findClientById(order.customerID._id, "customer").tokenNotification, "Đã có tài xế nhận đơn")
      }
      const merchantClients = this.findAllClientMerchantById(order.merchantID._id);
      console.log("listmerchant : ", merchantClients);

      if (merchantClients.length > 0) {
        merchantClients.forEach(client => {
          this.sendNotication(client.tokenNotification, "Bạn có đơn hàng mới")
        })
        console.log("sended");

      }

      this.createChatRoom(order._id, order.customerID._id, order.shipperID._id);
    }
    // shipper đã đến nhà hàng
    if (type_user === "shipper" && command === "waiting") {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", command);

      this.realTimeTo1Object(type_user, command, order);
    }
    // shipper đã lấy hàng
    if (type_user === "shipper" && command === "delivering") {
      this.realTimeTo2Object(type_user, command, order);
    }
    // shipper hủy đơn hàng vì nhà hàng không hoạt động hoặc hết món
    if (type_user === "shipper" && command === "cancelled_from_shipper") {
      this.realTimeTo2Object(type_user, command, order);
      this.sendNotication(this.findClientById(order.customerID._id, "customer").tokenNotification, "Đơn hàng đã bị hủy từ tài xế")

      const merchantClients = this.findAllClientMerchantById(order.merchantID._id);
      console.log(merchantClients.length);
      if (merchantClients.length > 0) {
        merchantClients.forEach(client => {
          this.sendNotication(client.tokenNotification, "Đơn hàng đã bị hủy từ tài xế")
        })
      }
      this.deleteChatRoom(order._id);
    }
    // shipper đã đến nơi giao
    if (type_user === "shipper" && command === "arrived") {
      this.realTimeTo1Object(type_user, command, order);
      this.sendNotication(this.findClientById(order.customerID._id, "customer").tokenNotification, "Tài xế đã đến nơi giao")
    }
    // shipper giao hàng thành công
    if (type_user === "shipper" && command === "success") {
      this.realTimeTo1Object(type_user, command, order);
      setTimeout(() => {
        this.deleteChatRoom(order._id);
      }, 3 * 60 * 60 * 1000); // 3 giờ
    }
    // shipper hủy đơn hàng (khách boom hàng)
    if (type_user === "shipper" && command === "fake_order") {
      this.realTimeTo1Object(type_user, command, order);
      this.sendNotication(this.findClientById(order.customerID._id, "customer").tokenNotification, "Đơn hàng đã bị hủy vì không liên lạc được cho bạn")
    }
    // merchant hủy đơn hàng
    if (type_user === "merchant" && command === "cancelled_from_merchant") {
      this.realTimeTo2Object(type_user, command, order);
      this.sendNotication(this.findClientById(order.customerID._id, "customer").tokenNotification, "Đơn hàng đã bị hủy từ nhà hàng")
      this.sendNotication(this.findClientById(order.shipperID._id, "shipper").tokenNotification, "Đơn hàng đã bị hủy từ nhà hàng")
      this.deleteChatRoom(order._id);
    }
    if (command === "chat") {
      const { message, type_mess } = payload;
      if (type_mess != "loading") {
        const roomName = `room_${order._id}`;
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
        console.log(this.chatRooms.get(roomName));

        this.server.to(roomName).emit('chatMessage', chatMessage);
        if (type_user === 'shipper') {
          this.sendNotication(this.findClientById(order.customerID._id, "customer").tokenNotification, "Tin nhắn mới")
        } else {
          this.sendNotication(this.findClientById(order.shipperID._id, "shipper").tokenNotification, "Tin nhắn mới")
        }
        this.sendMessageToClient(this.findClientById(order.customerID._id, "customer").socket, "chat", { orderID: order._id, fullChat: this.chatRooms.get(roomName) });
        this.sendMessageToClient(this.findClientById(order.shipperID._id, "shipper").socket, "chat", { orderID: order._id, fullChat: this.chatRooms.get(roomName) });
      }
    }
  }
  // @SubscribeMessage('chatMessage')
  // handleChatMessage(client: Socket, @MessageBody() payload: any): void {
  //   const { order, type_user, message, type_mess } = payload;
  //   const roomName = `room_${order._id}`;
  //   const chatMessage: MessageRow = {
  //     typeUser: type_user,
  //     message: message,
  //     timestamp: new Date(),
  //     type_mess: type_mess
  //   };

  //   if (this.chatRooms.has(roomName)) {
  //     this.chatRooms.get(roomName).push(chatMessage);
  //   } else {
  //     this.chatRooms.set(roomName, [chatMessage]);
  //   }
  //   this.server.to(roomName).emit('chatMessage', chatMessage);
  //   if (type_user === 'shipper') {
  //     this.sendNotication(this.findClientById(order.customerID._id, "customer").tokenNotification, "Tin nhắn mới")
  //   } else {
  //     this.sendNotication(this.findClientById(order.shipperID._id, "shipper").tokenNotification, "Tin nhắn mới")
  //   }
  //   this.sendFullChatToClient(this.findClientById(order.customerID._id, "customer").socket, order);
  //   this.sendFullChatToClient(this.findClientById(order.shipperID._id, "shipper").socket, order);
  // }


  // Function để gửi tin nhắn từ server tới client cụ thể
  sendMessageToClient(client: Socket, command: string, order: any): void {

    client.emit('message', { command: command, order: order });
  }
  //gửi tin nhắn từ sever tới client về chat
  // sendFullChatToClient(client: Socket, order: any): void {
  //   const roomName = `room_${order._id}`;
  //   client.emit('chatMessage', { order: order, command: "chat", fullchat: this.chatRooms.get(roomName) });
  // }

  // Function để tìm kiếm client
  findClientById(id_user: string, type_user: string): ConnectedClient | undefined {
    switch (type_user) {
      case "customer":
        return this.customers.find(client => client.id_user === id_user)
      case "shipper":
        return this.shippers.find(client => client.id_user === id_user)
      default:
        return undefined
    }
  }
  findAllClientMerchantById(id_merchant: string): ConnectedClient[] | undefined {
    return this.merchants.filter(client => client.id_merchant === id_merchant);
  }
  sendNotication(tokenNotification: string, messageBody: string) {
    const message = {
      notification: {
        title: 'YumHub',
        body: messageBody,
      },
      token: tokenNotification,
    };

    this.uploadService.sendNotification(message);
  }
  private createChatRoom(orderId: string, customerId: string, shipperId: string) {
    const roomName = `room_${orderId}`;
    this.server.to([customerId, shipperId]).socketsJoin(roomName);
    const chatMessage: MessageRow = {
      typeUser: "shipper",
      message: "ban vui long cho chut nhe",
      timestamp: new Date(),
      type_mess: "text"
    };
    this.chatRooms.set(roomName, [chatMessage]);
  }

  private deleteChatRoom(orderId: string) {
    const roomName = `room_${orderId}`;
    this.chatRooms.delete(roomName);
    this.server.socketsLeave(roomName);
  }

}
