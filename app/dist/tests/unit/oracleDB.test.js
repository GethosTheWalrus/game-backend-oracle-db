"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const oracleDB_service_1 = require("../../services/oracleDB.service");
describe('Oracle DB Service', () => {
    describe('PLAYERSCORES duality view is queried', () => {
        let players;
        let player;
        let scores = [];
        let firstScore;
        let secondScore;
        it('should return a single player with id 1 and set some helper variables', () => __awaiter(void 0, void 0, void 0, function* () {
            players = yield (0, oracleDB_service_1.getScoresForUsers)(1);
            player = players[0];
        }));
        test('only 1 player was retrieved by the query', () => {
            expect(players.length).toBe(1);
        });
        test('BigBird is the username of the retrieved user', () => {
            expect(player.username).toBe('BigBird');
        });
    });
});
