import oracledb from 'oracledb';
import OracleDB from 'oracledb';
import { Player } from '../models/scores.type';
import { simpleSQLBuilder } from '../utils/query.util';
import { logMessageSomewhere } from '../utils/logger.util';
import { openConnection, closeConnection } from '../utils/oracleDB.util';


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
        logMessageSomewhere("insertNewUser: " + err);
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
        logMessageSomewhere("insertNewScoreForUser: " + err);
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