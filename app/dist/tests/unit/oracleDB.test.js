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
        test('validates that gamer_2 is able to be retrieved from the DB and has 2 scores of value 1 and 16', () => __awaiter(void 0, void 0, void 0, function* () {
            let players = yield (0, oracleDB_service_1.selectScores)('gamer_2');
            expect(players.length).toBe(1);
            let player = players[0];
            expect(player.username).toBe('gamer_2');
            let scores = player.scores;
            expect(scores.length).toBe(2);
            let firstScore = scores[0];
            let secondScore = scores[1];
            console.log(firstScore.value);
            expect(firstScore.value).toBe(1);
            expect(secondScore.value).toBe(16);
        }));
    });
});
