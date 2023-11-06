import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { selectScores } from '../services/oracleDB.service'

export const scoresRouter = express.Router();

scoresRouter.use(function timeLog(req: Request, res: Response, next: NextFunction) {
    console.log('Time: ', Date.now());
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
});

scoresRouter.get('/', async function(req: Request, res: Response) {
    let queryParamUsername = req.query.username as string;
    let scores = await selectScores(queryParamUsername);
    res.send(scores);
});

