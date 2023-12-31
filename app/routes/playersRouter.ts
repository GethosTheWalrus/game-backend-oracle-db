import { Request, Response } from 'express';
import express from 'express';
import { getScoresForUsers, insertNewScoreForUser, insertNewUser } from '../services/oracleDB.service'
import { validateEndpointInput } from '../middleware/validator.middleware';
import { Player, PlayerScoresValue } from '../models/scores.type';
import { ROOT_URL } from '../environment/environment';

export const playersRouter = express.Router();

// connect middlewares to router
playersRouter.use(validateEndpointInput);

playersRouter.route('/users')
    /* 
     * List all registerred users
     * output: Player[]
    */
    .get( async (req: Request, res: Response) => {
        let scores = await getScoresForUsers();
        res.send(scores);
    })
    /* 
     * Add a new registerred user
     * input: Player (username only)
     * output: Player[]
    */
    .post( async (req: Request, res: Response) => {
        let newUser: Player = req.body;
        let newUserId: number = await insertNewUser(newUser.username);
        res.location(ROOT_URL + '/users/' + newUserId).status(201).end();
    });

playersRouter.route('/users/:user')
    /* 
     * View a selected registerred user
     * output: Player[]
    */
    .get( async (req: Request, res: Response) => {
        let userId = req.params.user as string;
        let userIdNumber = parseInt(userId!) || -1;
        let scores = await getScoresForUsers(userIdNumber);
        res.send(scores);
    })

    playersRouter.route('/users/:user/scores')
    /* 
     * Insert a new PlayerScoresValue into the specified Player
     * input: PlayerScoresValues[]
     * output: Player[]
    */
    .post( async (req: Request, res: Response) => {
        let userId = req.params.user as string;
        let userIdNumber = parseInt(userId!) || -1;
        let newScores = req.body;

        newScores.forEach( (score: PlayerScoresValue) => {
            insertNewScoreForUser(userIdNumber, score.value);
        });

        res.location(ROOT_URL + '/users/' + userIdNumber).status(201).end();
    });
