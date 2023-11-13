import { PlayerScoresValue } from '../models/scores.type';
import { Validation } from '../models/validation.type';
import { logMessageSomewhere } from './logger.util';

export function validateScoresPostRoute(requestBody: PlayerScoresValue[]): Validation {
    if (requestBody.length < 1) {
        let message: string = 'Cannot insert an empty set of scores';
        logMessageSomewhere(message);
        return { success: false, message: message };
    }

    let validationResult: boolean = true
    let message = '';

    requestBody.forEach( (item) => {
        let score: PlayerScoresValue = item
        if (!score.value || score.value < 0) {
            validationResult = false;
            message = 'Score value must be present and >= 0 for each score.';
        }
    });

    return { success: validationResult, message: message };
}