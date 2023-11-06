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
const express = require('express');
const router = express.Router();
const oracledb = require('oracledb');
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', function (req, res) {
    runApp();
    res.send("Hello world!");
});
function runApp() {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        try {
            connection = yield oracledb.getConnection({ user: "C##GAMEDB", password: "password", connectionString: "localhost:1521/FREE" });
            console.log("Successfully connected to Oracle Database");
            var result = yield connection.execute(`select json_serialize(p.data) as data from C##GAMEDB.PLAYER_SCORES p`, [], {
                resultSet: true,
                outFormat: oracledb.OUT_FORMAT_OBJECT
            });
            const rs = result.resultSet;
            let row;
            while ((row = yield rs.getRow())) {
                console.log(row);
            }
            yield rs.close();
        }
        catch (err) {
            console.error(err);
        }
        finally {
            if (connection) {
                try {
                    yield connection.close();
                }
                catch (err) {
                    console.error(err);
                }
            }
        }
    });
}
module.exports = router;
