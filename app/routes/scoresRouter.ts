import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { selectScores } from '../services/oracleDB.service'
import { logMessageSomewhere } from '../utils/logger.util';

export const scoresRouter = express.Router();

scoresRouter.use(function timeLog(req: Request, res: Response, next: NextFunction) {
    console.log('Time: ', Date.now());
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
});

scoresRouter.get('/users', async function(req: Request, res: Response) {
    let scores = await selectScores();
    res.send(scores);
});

scoresRouter.get('/users/:user', async function(req: Request, res: Response) {
    let userId = req.params.user as string;
    let userIdNumber = parseInt(userId!) || -1;
    let scores = await selectScores(userIdNumber);
    res.send(scores);
});

