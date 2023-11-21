const oracledb = require('oracledb');
import OracleDB from 'oracledb';
import { logMessageSomewhere } from '../utils/logger.util';
import { ChatMessage } from '../models/message.type';
import { openConnection, closeConnection } from '../utils/oracleDB.util';

export async function enqueueOne(message: ChatMessage) {
    let connection;
    let enqueuedMessage: ChatMessage = { user: '', messageText: '' };
    try {
        connection = await openConnection();
        
        let messageString: string = JSON.stringify(message);

        /* invoke our PLSQL function to dequeue a message from our AQ */
        let query: string  = 
        `DECLARE
            returnValue varchar2(32767);
        BEGIN
            :returnValue := GAMEDB.ENQUEUEMESSAGE(:message);
        END;`;

        let bindParams = {
            message: messageString,
            returnValue:  { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        };

        // execute the query above
        let result: OracleDB.Result<{returnValue: ChatMessage}> = await connection.execute(
            query, 
            bindParams, 
            {
                resultSet: true, 
                outFormat: oracledb.OUT_FORMAT_OBJECT,
                autoCommit: true
            }
        );
        enqueuedMessage = result.outBinds!.returnValue;
    } catch(e) {
        logMessageSomewhere(e);
    } finally {
        if (connection) {
            closeConnection(connection);
        }
        return enqueuedMessage
    }
}

export async function dequeueOne(): Promise<ChatMessage> {
    let connection;
    let dequeuedMessage: ChatMessage = { user: '', messageText: '' };
    try {
        connection = await openConnection();

        /* invoke our PLSQL function to dequeue a message from our AQ */
        let query: string  = 
        `DECLARE
            returnValue varchar2(32767);
        BEGIN
            :returnValue := GAMEDB.DEQUEUEMESSAGE();
        END;`;

        let bindParams = {
            returnValue:  { dir: oracledb.BIND_OUT, type: oracledb.STRING },
        };

        // execute the query above
        let result: OracleDB.Result<{returnValue: ChatMessage}> = await connection.execute(
            query, 
            bindParams, 
            {
                resultSet: true, 
                outFormat: oracledb.OUT_FORMAT_OBJECT,
                autoCommit: true
            }
        );
        dequeuedMessage = result.outBinds!.returnValue;
    } catch(e) {
        logMessageSomewhere(e);
    } finally {
        if (connection) {
            closeConnection(connection);
        }
        return dequeuedMessage
    }
}