"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const server_service_1 = require("./services/server.service");
// Start the background process to poll for chat messages
server_service_1.ServerService.startBackgroundChatPollProcess();
// Start the HTTP and web socket servers
server_service_1.ServerService.startServer();
