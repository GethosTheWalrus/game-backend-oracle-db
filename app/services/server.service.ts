import cors from 'cors';
import express from 'express';
import bodyparser from 'body-parser';
import { Player } from '../models/scores.type';
import { chatRouter } from '../routes/chatRouter';
import { enqueueOne } from './oracleQueue.service';
import { ChatMessage } from '../models/message.type';
import { getScoresForUsers } from './oracleDB.service';
import { playersRouter } from '../routes/playersRouter';
import { dequeueMany } from '../services/oracleQueue.service';
import { CHAT_POLL_INTERVAL, CHAT_POLL_MESSAGE_COUNT } from '../environment/environment';

export class ServerService {  
    static app = express();
    static server = require('http').createServer(this.app);
    static io  = ServerService.initServer(ServerService.server);

    /*
     * Initialize the web socket listener.
     * This will allow clients to open websocket
     * connections on the same port that our http
     * server listens on.
    */
    static initServer(server: any): any {
        // connect the additional modules and the routers to the http server
        ServerService.app.use(bodyparser.json());
        ServerService.app.use(cors());
        ServerService.app.use(playersRouter);
        ServerService.app.use(chatRouter);

        // define the socket io objct
        const io  = require("socket.io")(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        });

        io.on("connection", function(socket: any) {
            
            // listen for arriving chat messages
            socket.on('chat', async (message: ChatMessage) => {
                /* 
                 * After receiving a message, we make a call to the 
                 * database to retrieve its username. We then update
                 * the model to contain the username, and enqueue it
                 * in our AQ to be delivered in batches.
                */
                let players: Player[] = await getScoresForUsers(Number(message.user));
    
                if (players.length < 1) {
                    return;
                }
    
                let player = players[0];
                message.user = String(player.username);
                message.socketId = socket.id;
                enqueueOne(message);
            });
    
            // listen for disconnect events
            socket.on('disconnect', () => {
                //
            });
        });

        return io;
    }

    // start a background task to poll for new chat messages
    static startBackgroundChatPollProcess() {
        setInterval( async () => {
            // dequeue our messages
            let batchOfMessages = await dequeueMany(CHAT_POLL_MESSAGE_COUNT);
            // broadcast the messages to our connected clients
            console.log('broadcasting ', batchOfMessages.length, ' messages');
            batchOfMessages.forEach( (message: ChatMessage) => {
                ServerService.io.emit('chat', message);
            });
        }, CHAT_POLL_INTERVAL);
    }

    static startServer() {
        ServerService.server.listen(3000);
    }
}