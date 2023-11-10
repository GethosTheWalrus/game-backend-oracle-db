import oracledb from 'oracledb';
import { DB_USER, DB_PASSWORD, DB_ADDRESS, DB_PORT, DB_SERVICE } from '../environment/environment';
import { Player } from '../models/scores.type';
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

export async function insertNewScoreForUser(userId: number, score: number) {
    let connection;
    try {
        connection = await openConnection();
        let query: string  = simpleSQLBuilder(
            'insert', 
            'C##GAMEDB.SCORES', 
            't',
            [
                'value',
                'user_id'
            ], 
            [],
            [
                ['score', 'userId']
            ],
            []
        );

        let bindParams: { userId?: number, score?: number } = {};

        if (userId && score) {
            bindParams.userId = userId;
            bindParams.score = score;
        }

        await connection.execute( 
            query, 
            bindParams, 
            {
                resultSet: true, 
                outFormat: oracledb.OUT_FORMAT_OBJECT,
                autoCommit: true
            }
        );
    } catch(err) {
        logMessageSomewhere(err);
    } finally {
        if (connection) {
            closeConnection(connection);
        }
    }
}

export async function getScoresForUsers(userId?: number): Promise<Player[]> {
    let connection;
    let scores: Player[] = [];
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
            bindParams.userId = userId;
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
                ) as Player
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
