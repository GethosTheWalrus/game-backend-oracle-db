"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUEUE_NAME = exports.ROOT_URL = exports.DB_SERVICE = exports.DB_PASSWORD = exports.DB_USER = exports.DB_PORT = exports.DB_ADDRESS = void 0;
// process.env
exports.DB_ADDRESS = process.env.ORACLEDB_ADDRESS || 'localhost';
exports.DB_PORT = process.env.ORACLEDB_PORT || '1521';
exports.DB_USER = process.env.ORACLEDB_USER || 'sys';
exports.DB_PASSWORD = process.env.ORACLEDB_PASSWORD || 'password';
exports.DB_SERVICE = process.env.ORACLEDB_SERVICE || 'FREEPDB1';
exports.ROOT_URL = process.env.SITEURL || 'localhost:3000';
exports.QUEUE_NAME = process.env.QUEUE_NAME || 'GAMEDB.GAME_CHAT_QUEUE';
