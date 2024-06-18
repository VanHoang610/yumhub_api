import * as WebSocket from 'ws';
import * as http from 'http';
import * as express from 'express';
import * as dotenv from 'dotenv';
const { Server } = require('ws');
dotenv.config();

export class dth_socket {
    constructor() {
        // const app = express();
        // const port = process.env.PORT || 8080;

        // // Tạo HTTP server
        // const server = http.createServer(app);
        const PORT = process.env.PORT;
        const server = express()
            .use((req, res) => res.sendFile("/index.html", { root: __dirname }))
            .listen(PORT, () => console.log(`Listening on ${PORT}`));
        // Tạo WebSocket server sử dụng HTTP server
        const wss = new Server({ server });

        const clientsCustomer = {};
        const clientsShipper = {};
        const clientsMerchant = {};

        function sendMessageToClient(id, typeClient, message) {
            const clientID = getClientID(id, typeClient);
            if (clientID) {
                switch (typeClient) {
                    case "customer":
                        clientsCustomer[clientID].connection.send(message);
                        break;
                    case "shipper":
                        clientsShipper[clientID].connection.send(message);
                        break;
                    case "merchant":
                        clientsMerchant[clientID].connection.send(message);
                        break;
                    default:
                        break;
                }
            } else {
                console.log('Client ID not found: ' + id);
            }
        }

        function handleNewConnection(connection, id, typeClient) {
            switch (typeClient) {
                case "customer":
                    clientsCustomer[id] = { connection: connection, id: id };
                    break;
                case "shipper":
                    clientsShipper[id] = { connection: connection, id: id };
                    break;
                case "merchant":
                    clientsMerchant[id] = { connection: connection, id: id };
                    break;
                default:
                    break;
            }
            console.log(`New ${typeClient} client connected, ID: ${id}`);
            connection.send('Hello! Welcome to YumHub server');
        }

        function getClientID(id, typeClient) {
            switch (typeClient) {
                case "customer":
                    return Object.keys(clientsCustomer).find(clientID => clientsCustomer[clientID].id === id);
                case "shipper":
                    return Object.keys(clientsShipper).find(clientID => clientsShipper[clientID].id === id);
                case "merchant":
                    return Object.keys(clientsMerchant).find(clientID => clientsMerchant[clientID].id === id);
                default:
                    break;
            }
        }

        wss.on('connection', (connection, req) => {
            const token = req.headers['token'];
            const id = req.headers['id'];
            const typeClient = req.headers['typeclient'];

            if (!token || !id || !typeClient) {
                connection.close();
                return;
            }
            handleNewConnection(connection, id, typeClient);

            connection.on('message', (message) => {
                const jsonString = message.toString();
                const jsonObject = JSON.parse(jsonString);

                switch (jsonObject.command) {
                    case "connect":
                        console.log(jsonObject.data);
                        break;
                    case "book":
                        console.log(jsonObject.data.customerID._id);
                        sendMessageToClient("660c99c2fc13ae788b50fbdc", "merchant", "jsonObject.data");
                        sendMessageToClient("6604e1ec5a6c5ad8711aebfa", "shipper", "jsonObject.data");
                        break;
                    case "cancel":

                        break;
                    default:
                        break;
                }
            });

            connection.on('close', () => {
                // Clean up client connections when they disconnect
                delete clientsCustomer[id];
                delete clientsShipper[id];
                delete clientsMerchant[id];
                console.log(`Client ${typeClient} with ID ${id} disconnected.`);
            });
        });
    }
}