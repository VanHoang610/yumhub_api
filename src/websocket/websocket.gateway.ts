import { json } from 'stream/consumers';
import * as WebSocket from 'ws';

export class dth_socket {
    constructor() {
        const wss = new WebSocket.Server({ port: 8080 });

        const clients = {};

        function sendMessageToClient(token, message){
            const clientID = getClientIDByToken(token);
            if(clientID){
                const client = clients[clientID];
                client.connection.send(message);
            }else{
                console.log('Token not found client:'+ token);
            }
        }

        function handleNewConnection(connection, token){
            clients[token] = { connection: connection };

            console.log('Client mới đã kết nối, Token: ' + token);

            connection.send('Hello! welcome to YumHub server');
        }

        function getClientIDByToken(token){
            return Object.keys(clients).find(clientID => clients[clientID].token === token);
        }

        wss.on('connection', (connection, req) => {
            const token = req.headers['token'];

            if(!token){
                connection.close();
                return;
            }
            handleNewConnection(connection, token);
            connection.on('message', (message) => {
                const jsonString = message.toString();

                const jsonObject = JSON.parse(jsonString);

                if (jsonObject.command == 'book'){
                    console.log(jsonObject.command);
                }
                });
            })
    }
}