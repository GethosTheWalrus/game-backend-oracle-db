import oracledb from 'oracledb';
import { DB_USER, DB_PASSWORD, DB_ADDRESS, DB_PORT, DB_SERVICE } from '../environment/environment';
import { Player } from '../models/scores.type';
import { simpleSQLBuilder } from '../utils/query.util';
import { logMessageSomewhere } from '../utils/logger.util';
import OracleDB from 'oracledb';

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

export async function insertNewUser(username: string): Promise<number> {
    let connection;
    let newUserId: number = -1;
    try {
        connection = await openConnection();

        let newUser: Player = { "username" : username };

        /* insert JSON document directly into DB via the duality view */
        let query: string  = `insert into GAMEDB.PLAYER_SCORES t (data) values(:jsonStringifiedPlayer) RETURNING json_value(data, '$.id') INTO :newUserId`;

        let bindParams = {
            jsonStringifiedPlayer: JSON.stringify(newUser),
            newUserId:  { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
        };

        // perform the insert
        let result: OracleDB.Result<{newUserId: number[]}> = await connection.execute(
            query, 
            bindParams, 
            {
                resultSet: true, 
                outFormat: oracledb.OUT_FORMAT_OBJECT,
                autoCommit: true
            }
        );
        newUserId = result.outBinds!.newUserId[0];
    } catch(err) {
        logMessageSomewhere(err);
    } finally {
        if (connection) {
            closeConnection(connection);
        }
        return newUserId;
    }
}

export async function insertNewScoreForUser(userId: number, score: number) {
    let connection;
    try {
        connection = await openConnection();

        /* insert into GAMEDB.SCORES t (value, user_id) values (:score, :userid) */
        let query: string  = simpleSQLBuilder(
            'insert', 
            'GAMEDB.SCORES', 
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
    let players: Player[] = [];
    try {
        connection = await openConnection();

        /* select json_serialize(t.data) as DATA from GAMEDB.PLAYER_SCORES t (where t.data.id = :userid)? */
        let query: string = simpleSQLBuilder(
            'select', 
            'GAMEDB.PLAYER_SCORES', 
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

        console.log(query);
        console.log(bindParams);

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
            players.push(
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
        return players;
    }
}