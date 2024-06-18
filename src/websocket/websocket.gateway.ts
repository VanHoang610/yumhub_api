import * as WebSocket from 'ws';
import { IncomingMessage } from 'http';
import * as dotenv from 'dotenv';
dotenv.config();

export class dth_socket {
    constructor() {
        const PORT = process.env.WS_PORT || 8081;
        const wss = new WebSocket.Server({ port: PORT });

        const clients = {};

        function sendMessageToClient(token, message) {
            const clientID = getClientIDByToken(token);
            if (clientID) {
                const client = clients[clientID];
                client.connection.send(message);
            } else {
                console.log('Token not found for client: ' + token);
            }
        }

        function handleNewConnection(connection, token) {
            clients[token] = { connection: connection };

            console.log('New client connected, Token: ' + token);

            connection.send('Hello! Welcome to YumHub server');
        }

        function getClientIDByToken(token) {
            return Object.keys(clients).find(clientID => clientID === token);
        }

        wss.on('connection', (connection: WebSocket, req: IncomingMessage) => {
            const token = req.headers['token'] as string;

            if (!token) {
                connection.close();
                return;
            }
            handleNewConnection(connection, token);

            connection.on('message', (message: WebSocket.Data) => {
                const jsonString = message.toString();
                const jsonObject = JSON.parse(jsonString);

                if (jsonObject.command === 'book') {
                    console.log(jsonObject.command);
                }
            });

            connection.on('close', () => {
                delete clients[token];
                console.log('Client disconnected, Token: ' + token);
            });
        });

        console.log(`WebSocket server is running on port ${PORT}`);
    }
}
