import 'dotenv/config';
import cors from 'cors';
import bodyparser from 'body-parser';
import express from 'express';
import { scoresRouter } from './routes/scoresRouter'

const app = express();
const server = require('http').createServer(app);

app.use(bodyparser.json());
app.use(cors());
app.use(scoresRouter);

server.listen(3000);