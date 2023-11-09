import oracledb from 'oracledb';
import { DB_USER, DB_PASSWORD, DB_ADDRESS, DB_PORT, DB_SERVICE } from '../environment/environment';
import { PlayerScores } from '../models/scores.type';
import { simpleSQLBuilder } from '../utils/query.util';
import { logMessageSomewhere } from '../utils/logger.util';

async function openConnection(): Promise<oracledb.Connection> {
    let connection;
    try {
        connection = await oracledb.getConnection({ user: DB_USER, password: DB_PASSWORD, connectionString: DB_ADDRESS+":"+DB_PORT+"/"+DB_SERVICE });
    } catch (err) {
        console.error(err);
    } finally {
        return connection as oracledb.Connection;
    }
}

async function closeConnection(connection: oracledb.Connection) {
    try {
        await connection.close();
    } catch (err) {
        console.error(err);
    }
}

// export async function updateScores(userId: number): Promise<PlayerScores[]> {

// }

export async function selectScores(userId?: number): Promise<PlayerScores[]> {
    let connection;
    let scores: PlayerScores[] = [];
    try {
        // connect
        connection = await openConnection();
        let query: string = simpleSQLBuilder(
            'select', 
            'C##GAMEDB.PLAYER_SCORES', 
            't',
            [
                'json_serialize(t.data) as DATA' 
            ], 
            [],
            [],
            [
                {
                    key: 't.data.id', 
                    paramName: 'userId', 
                    type: '', 
                    operator: '=', 
                    condition: userId != undefined
                }
            ]
        );
        
        let bindParams: { userId?: number } = {};

        if (userId) {
            bindParams.userId = userId
        }

        var result = await connection.execute( 
            query, 
            bindParams, 
            {
                resultSet: true, 
                outFormat: oracledb.OUT_FORMAT_OBJECT 
            }
        );

        // scan results
        const rs = result.resultSet; 
        let row;
        while ((row = await rs!.getRow())) {
            let resultObject: { DATA?: string } = row as Object
            scores.push(
                JSON.parse(
                    resultObject.DATA as string
                ) as PlayerScores
            );
        }
        await rs!.close();
    } catch (err) {
        logMessageSomewhere(err);
    } finally {
        if (connection) {
            closeConnection(connection);
        }
        return scores;
    }
}
