import { Request, Response, NextFunction } from 'express';
import { validateScoresPostRoute } from '../utils/validator.util';
import { httpError } from '../models/error.type';
import { Validation } from '../models/validation.type';

/* 
 * Generic middleware for validing endpoint input
 * input: http Request and Response objects
 * output: N/A (forwards input to the next function in the chain)
*/
export function validateEndpointInput(req: Request, res: Response, next: NextFunction) {
    let endpoint: string = req.path;
    let method: string = req.method.toLowerCase();

    let validationResult: Validation = { success: true, message: '' };
    if (method == 'post') {
        if ( new RegExp('^\/users\/\\d+\/scores$').test(endpoint) ) {
            validationResult = validateScoresPostRoute(req.body);
        } else if ( new RegExp('^\/users\/\\d+\/$').test(endpoint) ) {
        }
    }
    
    if (!validationResult.success) {
        let err: httpError = {
            code: 100,
            message: validationResult.message
        }
        res.send(err);
    } else {
        next();
    }
}