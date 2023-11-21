// process.env
export const DB_ADDRESS: string = process.env.ORACLEDB_ADDRESS || 'localhost';
export const DB_PORT: string = process.env.ORACLEDB_PORT || '1521';
export const DB_USER: string = process.env.ORACLEDB_USER || 'sys';
export const DB_PASSWORD: string = process.env.ORACLEDB_PASSWORD || 'password';
export const DB_SERVICE: string = process.env.ORACLEDB_SERVICE || 'FREEPDB1';
export const ROOT_URL: string = process.env.SITEURL || 'localhost:3000';
export const QUEUE_NAME: string = process.env.QUEUE_NAME || 'GAMEDB.GAME_CHAT_QUEUE';