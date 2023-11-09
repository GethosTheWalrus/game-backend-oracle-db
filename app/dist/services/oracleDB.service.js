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
exports.selectScores = void 0;
const oracledb_1 = __importDefault(require("oracledb"));
const environment_1 = require("../environment/environment");
const query_util_1 = require("../utils/query.util");
const logger_util_1 = require("../utils/logger.util");
function openConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        try {
            connection = yield oracledb_1.default.getConnection({ user: environment_1.DB_USER, password: environment_1.DB_PASSWORD, connectionString: environment_1.DB_ADDRESS + ":" + environment_1.DB_PORT + "/" + environment_1.DB_SERVICE });
        }
        catch (err) {
            console.error(err);
        }
        finally {
            return connection;
        }
    });
}
function closeConnection(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection.close();
        }
        catch (err) {
            console.error(err);
        }
    });
}
// export async function updateScores(userId: number): Promise<PlayerScores[]> {
// }
function selectScores(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        let scores = [];
        try {
            // connect
            connection = yield openConnection();
            let query = (0, query_util_1.simpleSQLBuilder)('select', 'C##GAMEDB.PLAYER_SCORES', 't', [
                'json_serialize(t.data) as DATA'
            ], [], [], [
                {
                    key: 't.data.id',
                    paramName: 'userId',
                    type: '',
                    operator: '=',
                    condition: userId != undefined
                }
            ]);
            let bindParams = {};
            if (userId) {
                bindParams.userId = userId;
            }
            var result = yield connection.execute(query, bindParams, {
                resultSet: true,
                outFormat: oracledb_1.default.OUT_FORMAT_OBJECT
            });
            // scan results
            const rs = result.resultSet;
            let row;
            while ((row = yield rs.getRow())) {
                let resultObject = row;
                scores.push(JSON.parse(resultObject.DATA));
            }
            yield rs.close();
        }
        catch (err) {
            (0, logger_util_1.logMessageSomewhere)(err);
        }
        finally {
            if (connection) {
                closeConnection(connection);
            }
            return scores;
        }
    });
}
exports.selectScores = selectScores;
