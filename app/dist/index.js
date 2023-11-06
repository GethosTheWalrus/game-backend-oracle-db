"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const scoresRouter_1 = require("./routes/scoresRouter");
const app = (0, express_1.default)();
const server = require('http').createServer(app);
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(scoresRouter_1.scoresRouter);
server.listen(3000);
