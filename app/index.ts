import 'dotenv/config';
import cors from 'cors';
import bodyparser from 'body-parser';
import express from 'express';
import { playersRouter } from './routes/playersRouter'
import { chatRouter } from './routes/chatRouter';
import { CHAT_POLL_INTERVAL, CHAT_POLL_MESSAGE_COUNT } from './environment/environment';
import { initSocket } from './services/socket.service';
import { dequeueMany } from './services/oracleQueue.service';
import { ChatMessage } from './models/message.type';

// configure the server
const app = express();
const server = require('http').createServer(app);
const io = initSocket(server);

// connect the additional modules and the routers
app.use(bodyparser.json());
app.use(cors());
app.use(playersRouter);
app.use(chatRouter);

// start a background task to poll for new chat messages
setInterval( async () => {
    // dequeue our messages
    let batchOfMessages = await dequeueMany(CHAT_POLL_MESSAGE_COUNT);
    // broadcast the messages to our connected clients
    console.log('broadcasting ', batchOfMessages.length, ' messages');
    batchOfMessages.forEach( (message: ChatMessage) => {
        io.emit('chat', message);
    });
}, CHAT_POLL_INTERVAL);

server.listen(3000);