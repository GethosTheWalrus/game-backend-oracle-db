// process.env
export const DB_ADDRESS: string = process.env.ORACLEDB_ADDRESS || 'localhost';
export const DB_PORT: string = process.env.ORACLEDB_PORT || '1521';
export const DB_USER: string = process.env.ORACLEDB_USER || 'sys';
export const DB_PASSWORD: string = process.env.ORACLEDB_PASSWORD || 'MySecurePassword123';
export const DB_SERVICE: string = process.env.ORACLEDB_SERVICE || 'FREEPDB1';
export const ROOT_URL: string = process.env.SITEURL || 'localhost:3000';
export const QUEUE_NAME: string = process.env.QUEUE_NAME || 'GAMEDB.GAME_CHAT_QUEUE';
export const CHAT_POLL_INTERVAL: number = Number(process.env.CHAT_POLL_INTERVAL) || 1000;
export const CHAT_POLL_MESSAGE_COUNT: number = Number(process.env.CHAT_POLL_MESSAGE_COUNT) || 5;
export const CONNECTION_STRING: string = process.env.ORACLEDB_CONNECTION_STRING || "localhost";