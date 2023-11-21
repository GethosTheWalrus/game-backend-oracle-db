import oracledb from 'oracledb';
import { DB_USER, DB_PASSWORD, DB_ADDRESS, DB_PORT, DB_SERVICE } from '../environment/environment';

export async function openConnection(): Promise<oracledb.Connection> {
    let connection;
    try {
        connection = await oracledb.getConnection({ user: DB_USER, password: DB_PASSWORD, connectionString: DB_ADDRESS+":"+DB_PORT+"/"+DB_SERVICE });
    } catch (err) {
        console.error(err);
    } finally {
        return connection as oracledb.Connection;
    }
}

export async function closeConnection(connection: oracledb.Connection) {
    try {
        await connection.close();
    } catch (err) {
        console.error(err);
    }
}