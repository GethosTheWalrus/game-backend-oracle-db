import { ChatMessage } from '../models/message.type';
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

export function validateChatMessagePostRoute(requestBody: ChatMessage): Validation {
    let message = '';

    if (!requestBody.user || !requestBody.messageText || requestBody.messageText.length < 1 || requestBody.user.length < 1) {
        message = 'Malformed input';
        logMessageSomewhere(message);
        return { success: false, message: message };
    }

    return { success: true, message: message };
}