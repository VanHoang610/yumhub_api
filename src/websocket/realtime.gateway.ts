import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';
  
  interface ConnectedClient {
    socket: Socket;
    id_user: string;
    type_user: string;
  }
  
  @WebSocketGateway()
  export class RealtimeGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    private customers: ConnectedClient[] = [];
    private shippers: ConnectedClient[] = [];
    private merchants: ConnectedClient[] = [];
  
    handleConnection(client: Socket) {
      const { id_user, type_user } = client.handshake.query;
  
      const connectedClient: ConnectedClient = {
        socket: client,
        id_user: id_user as string,
        type_user: type_user as string,
      };
  
      if (type_user === 'customer') {
        this.customers.push(connectedClient);
      } else if (type_user === 'shipper') {
        this.shippers.push(connectedClient);
      } else if (type_user === 'merchant') {
        this.merchants.push(connectedClient);
      }
  
      console.log(`${type_user} connected:`, id_user);
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
      const { id_user, type_user, command, message } = payload;
      console.log(`Received message from ${type_user} (ID: ${id_user}):`, message);
      if(type_user === "customer" && command === "placeOrder"){
        if (this.findClientById(message.shipperID._id, "shipper")){
          this.sendMessageToClient(this.findClientById(message.shipperID._id, "shipper").socket, message._id);
        }else{
          this.sendMessageToClient(this.findClientById(id_user, "customer").socket, "shipper không hoạt động");
        }
      }
      
      // this.server.emit('message', { id_user, type_user, message });
    }
  
    // Function để gửi tin nhắn từ server tới client cụ thể
    sendMessageToClient(client: Socket, message: string): void {
      client.emit('message', { message });
    }
  
    // Function để tìm kiếm client
    findClientById(id_user: string, type_user: string): ConnectedClient | undefined {
        switch (type_user) {
          case "customer":
            return this.customers.find(client => client.id_user === id_user)
          case "shipper":
            return this.shippers.find(client => client.id_user === id_user)
          case "merchant":
            return this.merchants.find(client => client.id_user === id_user)
          default:
            return undefined
        }
    }
  }
  