import 'dotenv/config';
import { Player } from "../../models/scores.type";
import { getScoresForUsers } from "../../services/oracleDB.service";

describe('Oracle DB Service', () => {
    describe('PLAYERSCORES duality view is queried', () => {
        let players: Player[];
        let player: Player;
        let scores;
        let firstScore: number;
        let secondScore: number;
        it('should return a single player with id 6 and set some helper variables', async () => {
            players  = await getScoresForUsers(6);
            player = players[0];
            scores = player.scores;
            firstScore = scores[0].value;
            secondScore = scores[1].value;
        });

        test('only 1 player was retrieved by the query', () => {
            expect(players.length).toBe(1);
        });
        test('gamer_2 is the username of the retrieved user', () => {
            expect(player.username).toBe('gamer_2');
        });
        test('retrieved user has 2 scores', () => {
            expect(scores.length).toBe(2);
        });
        test('first score value is 1', () => {
            expect(firstScore).toBe(1);
        });
        test('second score value is 16', () => {
            expect(secondScore).toBe(16);
        });
    });
});