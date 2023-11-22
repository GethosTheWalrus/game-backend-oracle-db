import { CHAT_POLL_MESSAGE_COUNT, CHAT_POLL_INTERVAL } from '../environment/environment';
import { ChatMessage } from '../models/message.type';
import { Player } from '../models/scores.type';
import { getScoresForUsers } from './oracleDB.service';
import { enqueueOne } from './oracleQueue.service';

/*
 * Initialize the web socket listener.
 * This will allow clients to open websocket
 * connections on the same port that our http
 * server listens on.
*/
export function initSocket(server: any): any {
    const io = require("socket.io")(server, {
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