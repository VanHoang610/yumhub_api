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
    tokenNotifaction: string;
  }
  
  @WebSocketGateway()
  export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
    constructor(private readonly uploadService: UploadService) {}
    @WebSocketServer()
    server: Server;
  
    private customers: ConnectedClient[] = [];
    private shippers: ConnectedClient[] = [];
    private merchants: ConnectedClient[] = [];
    
  
    handleConnection (client: Socket) {
      const { id_user, type_user, id_merchant, tokenNotifaction } = client.handshake.query;
  
      const connectedClient: ConnectedClient = {
        socket: client,
        id_user: id_user as string,
        type_user: type_user as string,
        id_merchant : id_merchant as string,
        tokenNotifaction : tokenNotifaction as string,
      };
  
      if (type_user === 'customer') {
        this.customers.push(connectedClient);
      } else if (type_user === 'shipper') {
        this.shippers.push(connectedClient);
      } else if (type_user === 'merchant') {
        this.merchants.push(connectedClient);
      }
  
      console.log(`${type_user} connected:`, id_user);
      this.uploadService.sendNotification(tokenNotifaction as string, {
        notification: {
          title: 'New Notification',
          body: 'This is a custom notification message',
        },
      });
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

    private realTimeTo2Object(type_user_send : string, command : string, order : any){
      if(type_user_send === "shipper"){
        if (this.findClientById(order.customerID._id, "customer")){
          this.sendMessageToClient(this.findClientById(order.customerID._id, "customer").socket, command, order);
        }else{
          // có thể xử lý bắn notification trên app customer nếu khách hàng không hoạt động app
        }
        const merchantClients = this.findAllClientMerchantById(order.merchantID._id);
        if (this.findAllClientMerchantById(order.merchantID._id).length > 0){
          merchantClients.forEach(client => {
            this.sendMessageToClient(client.socket, command, order);
          })
        }
      }else {
        
        if (this.findClientById(order.customerID._id, "customer")){
          this.sendMessageToClient(this.findClientById(order.customerID._id, "customer").socket, command, order);
        }else{
          // có thể xử lý bắn notification trên app customer nếu khách hàng không hoạt động app
        }
        if (this.findClientById(order.shipperID._id, "shipper")){
          this.sendMessageToClient(this.findClientById(order.shipperID._id, "shipper").socket, command, order);
        }else{
          // có thể xử lý bắn notification trên app merchant nếu khách hàng không hoạt động app
        }
      }
    }
    private realTimeTo1Object(type_user_send : string, command : string, order : any){
      if(type_user_send === "customer"){
        if (this.findClientById(order.shipperID._id, "shipper") !== undefined){
          this.sendMessageToClient(this.findClientById(order.shipperID._id, "shipper").socket, command, order);
        }else if(this.findClientById(order.customerID._id, "customer") !== undefined){
          this.sendMessageToClient(this.findClientById(order.customerID._id, "customer").socket, command, "shipper không hoạt động");
        }
      }else if(type_user_send === "shipper"){
        if(this.findClientById(order.customerID._id, "customer") !== undefined){
          this.sendMessageToClient(this.findClientById(order.customerID._id, "customer").socket, command, order);
        }else{
          // có thể xử lý bắn notification trên app customer nếu khách hàng không hoạt động app
        }
      }
    }
  
    @SubscribeMessage('message')
    handleMessage(client: Socket, @MessageBody() payload: any): void {
      const {type_user, command, order } = payload;
      console.log(`Received message from ${command}:`, order);

      // khách hàng đặt đơn hàng
      if(type_user === "customer" && command === "placeOrder"){
        this.realTimeTo1Object(type_user, command, order);
      }
      // shipper từ chối nhận đơn hàng
      if(type_user === "shipper" && command === "refuse"){
        this.realTimeTo1Object(type_user, command, order);
      }
      // shipper xác nhận nhận đơn hàng
      if(type_user === "shipper" && command === "accept"){
        this.realTimeTo2Object(type_user, command, order);
      }
      // shipper đã đến nhà hàng
      if(type_user === "shipper" && command === "waiting"){
        this.realTimeTo1Object(type_user, command, order);
      }
      // shipper đã lấy hàng
      if(type_user === "shipper" && command === "delivering"){
        this.realTimeTo2Object(type_user, command, order);
      }
      // shipper hủy đơn hàng vì nhà hàng không hoạt động hoặc hết món
      if(type_user === "shipper" && command === "cancelled_from_shipper"){
        this.realTimeTo2Object(type_user, command, order);
      }
      // shipper đã đến nơi giao
      if(type_user === "shipper" && command === "arrived"){
        this.realTimeTo1Object(type_user, command, order);
      }
      // shipper giao hàng thành công
      if(type_user === "shipper" && command === "success"){
        this.realTimeTo1Object(type_user, command, order);
      }
      // shipper hủy đơn hàng (khách boom hàng)
      if(type_user === "shipper" && command === "fake_order"){
        this.realTimeTo1Object(type_user, command, order);
      }
      // merchant hủy đơn hàng
      if(type_user === "merchant" && command === "cancelled_from_merchant"){
        this.realTimeTo2Object(type_user, command, order);
      }
    }
  
    // Function để gửi tin nhắn từ server tới client cụ thể
    sendMessageToClient(client: Socket, command: string, order: any): void {
      client.emit('message', {command : command, order : order});
    }
  
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
  }
  