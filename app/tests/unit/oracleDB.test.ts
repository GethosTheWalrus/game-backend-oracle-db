import 'dotenv/config';
import { Player, PlayerScoresValue } from "../../models/scores.type";
import { getScoresForUsers } from "../../services/oracleDB.service";

describe('Oracle DB Service', () => {
    describe('PLAYERSCORES duality view is queried', () => {
        let players: Player[];
        let player: Player;
        let scores: PlayerScoresValue[] = [];
        let firstScore: number;
        let secondScore: number;
        it('should return a single player with id 1 and set some helper variables', async () => {
            players  = await getScoresForUsers(1);
            player = players[0];
        });

        test('only 1 player was retrieved by the query', () => {
            expect(players.length).toBe(1);
        });
        test('BigBird is the username of the retrieved user', () => {
            expect(player.username).toBe('BigBird');
        });
    });
});