import { Request, Response } from 'express';
import express from 'express';
import { getScoresForUsers, insertNewScoreForUser } from '../services/oracleDB.service'
import { timeLog } from '../middleware/logger.middleware';
import { validateEndpointInput } from '../middleware/validator.middleware';
import { PlayerScoresValue } from '../models/scores.type';
import { ROOT_URL } from '../environment/environment';

export const playersRouter = express.Router();

// connect middlewares to router
playersRouter.use(timeLog);
playersRouter.use(validateEndpointInput);

/* View all registerred users
 * output: Player[]
*/
playersRouter.get('/users', async function(req: Request, res: Response) {
    let scores = await getScoresForUsers();
    res.send(scores);
});

playersRouter.route('/users/:user')
    /* View a selected registerred user
     * output: Player[]
    */
    .get(async (req: Request, res: Response) => {
        let userId = req.params.user as string;
        let userIdNumber = parseInt(userId!) || -1;
        let scores = await getScoresForUsers(userIdNumber);
        res.send(scores);
    });

    playersRouter.route('/users/:user/scores')
    /* Insert a new PlayerScoresValue into the specified Player
     * input: PlayerScoresValues[]
     * output: Player []
    */
    .post(async (req: Request, res: Response) => {
        let userId = req.params.user as string;
        let userIdNumber = parseInt(userId!) || -1;
        let newScores = req.body;

        newScores.forEach( (score: PlayerScoresValue) => {
            insertNewScoreForUser(userIdNumber, score.value);
        });

        res.location(ROOT_URL + '/users/' + userIdNumber).status(201).end();
    });
