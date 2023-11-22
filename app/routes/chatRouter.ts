import { Request, Response } from 'express';
import express from 'express';
import { ChatMessage } from '../models/message.type';
import { dequeueOne, enqueueOne } from '../services/oracleQueue.service';
import { validateEndpointInput } from '../middleware/validator.middleware';

export const chatRouter = express.Router();

// connect middlewares to router
chatRouter.use(validateEndpointInput);

chatRouter.route('/chat')
    /*
     * Accept a new chat message from a user
     * output: ChatMessage
    */
    .post( async (req: Request, res: Response) => {
        let newMessage: ChatMessage = req.body;
        let enqueuedMessage: ChatMessage = await enqueueOne(newMessage);
        res.status(202).send(enqueuedMessage);
    });