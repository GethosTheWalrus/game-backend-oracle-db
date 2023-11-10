import 'dotenv/config';
import cors from 'cors';
import bodyparser from 'body-parser';
import express from 'express';
import { playersRouter } from './routes/playersRouter'

const app = express();
const server = require('http').createServer(app);

app.use(bodyparser.json());
app.use(cors());
app.use(playersRouter);

server.listen(3000);