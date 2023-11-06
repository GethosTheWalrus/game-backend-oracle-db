import 'dotenv/config';
import { PlayerScores } from "../../models/scores.type";
import { selectScores } from "../../services/oracleDB.service";

describe('Oracle DB Service', () => {
    describe('PLAYERSCORES duality view is queried', () => {
        test('validates that gamer_2 is able to be retrieved from the DB and has 2 scores of value 1 and 16', async () => {
            let players: PlayerScores[] = await selectScores('gamer_2');
            expect(players.length).toBe(1);
            let player: PlayerScores = players[0];
            expect(player.username).toBe('gamer_2');
            let scores = player.scores;
            expect(scores.length).toBe(2);
            let firstScore = scores[0];
            let secondScore = scores[1];
            console.log(firstScore.value);
            expect(firstScore.value).toBe(1);
            expect(secondScore.value).toBe(16);
        });
    });
});