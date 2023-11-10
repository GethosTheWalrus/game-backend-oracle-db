import { PlayerScoresValue } from '../models/scores.type';
import { logMessageSomewhere } from './logger.util';

export function validateScoresPostRoute(requestBody: PlayerScoresValue[]) {
    if (requestBody.length < 1) {
        logMessageSomewhere('Cannot insert an empty set of scores');
        return false;
    }

    let validationResult: boolean = true

    requestBody.forEach( (item) => {
        let score: PlayerScoresValue = item
        if (!score.value || score.value < 0) {
            validationResult = false;
        }
    });

    return validationResult;
}