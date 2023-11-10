"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const playersRouter_1 = require("./routes/playersRouter");
const app = (0, express_1.default)();
const server = require('http').createServer(app);
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(playersRouter_1.playersRouter);
server.listen(3000);
