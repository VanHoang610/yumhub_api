import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
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
  }
  