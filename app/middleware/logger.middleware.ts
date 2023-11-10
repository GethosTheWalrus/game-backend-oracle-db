import { Request, Response, NextFunction } from 'express';

export function timeLog(req: Request, res: Response, next: NextFunction) {
    console.log('Time: ', Date.now());
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
}