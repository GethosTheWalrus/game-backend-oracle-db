"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_SERVICE = exports.DB_PASSWORD = exports.DB_USER = exports.DB_PORT = exports.DB_ADDRESS = void 0;
exports.DB_ADDRESS = process.env.ORACLEDB_ADDRESS || 'localhost';
exports.DB_PORT = process.env.ORACLEDB_PORT || '1521';
exports.DB_USER = process.env.ORACLEDB_USER || 'sys';
exports.DB_PASSWORD = process.env.ORACLEDB_PASSWORD || 'password';
exports.DB_SERVICE = process.env.ORACLEDB_SERVICE || 'FREE';
