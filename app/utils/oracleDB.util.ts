import oracledb from 'oracledb';
import { DB_USER, DB_PASSWORD, DB_ADDRESS, DB_PORT, DB_SERVICE } from '../environment/environment';
import { logMessageSomewhere } from './logger.util';

export async function openConnection(): Promise<oracledb.Connection> {
    let connection;
    try {
        connection = await oracledb.getConnection({ user: DB_USER, password: DB_PASSWORD, connectionString: DB_ADDRESS+":"+DB_PORT+"/"+DB_SERVICE });
    } catch (err) {
        // console.error(err);
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

export async function checkDBHealth(): Promise<boolean> {
    let connection;
    let health: boolean = false;
    try {
        connection = await openConnection();

        let query: string = "select count(*) from GAMEDB.GAME_CHAT_TABLE";

        var result = await connection.execute( 
            query, 
            {}, 
            {
                resultSet: true, 
                outFormat: oracledb.OUT_FORMAT_OBJECT 
            }
        );

        // scan results
        const rs = result.resultSet; 
        let row;
        while ((row = await rs!.getRow())) {
            health = true;
        }
        await rs!.close();
    } catch (err) {
        logMessageSomewhere('awaiting DB health checks...');
        // logMessageSomewhere(err);
    } finally {
        if (connection) {
            closeConnection(connection);
        }
        return health;
    }
}