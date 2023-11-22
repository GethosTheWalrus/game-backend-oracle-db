"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const playersRouter_1 = require("./routes/playersRouter");
const chatRouter_1 = require("./routes/chatRouter");
const environment_1 = require("./environment/environment");
const socket_service_1 = require("./services/socket.service");
const oracleQueue_service_1 = require("./services/oracleQueue.service");
// configure the server
const app = (0, express_1.default)();
const server = require('http').createServer(app);
const io = (0, socket_service_1.initSocket)(server);
// connect the additional modules and the routers
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(playersRouter_1.playersRouter);
app.use(chatRouter_1.chatRouter);
// start a background task to poll for new chat messages
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    // dequeue our messages
    let batchOfMessages = yield (0, oracleQueue_service_1.dequeueMany)(environment_1.CHAT_POLL_MESSAGE_COUNT);
    // broadcast the messages to our connected clients
    console.log('broadcasting ', batchOfMessages.length, ' messages');
    batchOfMessages.forEach((message) => {
        io.emit('chat', message);
    });
}), environment_1.CHAT_POLL_INTERVAL);
server.listen(3000);
