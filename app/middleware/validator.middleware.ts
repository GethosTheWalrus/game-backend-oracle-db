import { Request, Response, NextFunction } from 'express';
import { validateScoresPostRoute } from '../utils/validator.util';
import { httpError } from '../models/error.type';

export function validateEndpointInput(req: Request, res: Response, next: NextFunction) {
    let endpoint = req.path;
    let method = req.method.toLowerCase();

    let validationResult: boolean = true;
    if (method == 'post' && new RegExp('^\/users\/\\d+\/scores$').test(endpoint)) {
        validationResult = validateScoresPostRoute(req.body);
    }
    
    if (!validationResult) {
        let err: httpError = {
            code: 100,
            message: 'Error with input. Expected an array of PlayerScoresValues'
        }
        res.send(err);
    } else {
        next();
    }
}