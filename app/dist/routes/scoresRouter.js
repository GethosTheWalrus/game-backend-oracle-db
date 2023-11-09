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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scoresRouter = void 0;
const express_1 = __importDefault(require("express"));
const oracleDB_service_1 = require("../services/oracleDB.service");
exports.scoresRouter = express_1.default.Router();
exports.scoresRouter.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    res.set('Content-Type', 'application/json; charset=utf-8');
    next();
});
exports.scoresRouter.get('/users', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let scores = yield (0, oracleDB_service_1.selectScores)();
        res.send(scores);
    });
});
exports.scoresRouter.get('/users/:user', function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let userId = req.params.user;
        let userIdNumber = parseInt(userId) || -1;
        let scores = yield (0, oracleDB_service_1.selectScores)(userIdNumber);
        res.send(scores);
    });
});
