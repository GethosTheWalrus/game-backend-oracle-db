ALTER SESSION SET CONTAINER=FREEPDB1;

-- create the queue and queue table to support the chat
BEGIN
  DBMS_AQADM.CREATE_QUEUE_TABLE(
    QUEUE_TABLE        =>  'GAMEDB.GAME_CHAT_TABLE',
    QUEUE_PAYLOAD_TYPE =>  'RAW');

  DBMS_AQADM.CREATE_QUEUE(
    QUEUE_NAME         =>  'GAMEDB.GAME_CHAT_QUEUE',
    QUEUE_TABLE        =>  'GAMEDB.GAME_CHAT_TABLE');

  DBMS_AQADM.START_QUEUE(
    QUEUE_NAME         => 'GAMEDB.GAME_CHAT_QUEUE');
END;
/
-- create a PLSQL function to enqueue a message
create or replace function GAMEDB.ENQUEUEMESSAGE
   ( message IN varchar2 ) 
    RETURN varchar2
IS
    l_enqueue_options     dbms_aq.enqueue_options_t;
    l_message_properties  dbms_aq.message_properties_t;
    l_message_handle      raw(16);
    l_event_msg           raw(32767);
    msg_text              varchar2(32767);
BEGIN
    l_event_msg := utl_raw.cast_to_raw(message);
    dbms_aq.enqueue(queue_name => 'GAMEDB.GAME_CHAT_QUEUE',
                   enqueue_options => l_enqueue_options,
                   message_properties => l_message_properties,
                   payload => l_event_msg,
                   msgid => l_message_handle);
    msg_text := utl_raw.cast_to_varchar2(l_event_msg);
    return msg_text;
END ENQUEUEMESSAGE;
/
-- create a PLSQL function to dequeue a message
create or replace function GAMEDB.DEQUEUEMESSAGE return varchar2 as
    l_dequeue_options     dbms_aq.dequeue_options_t;
    l_message_properties  dbms_aq.message_properties_t;
    l_message_handle      raw(16);
    l_event_msg           raw(32767);
    msg_text              varchar2(32767);
    queue_length          number;
BEGIN
    msg_text := '{}';
    SELECT COUNT(*) INTO queue_length FROM GAMEDB.GAME_CHAT_TABLE;
    IF queue_length > 0 THEN
        dbms_aq.dequeue(queue_name => 'GAMEDB.GAME_CHAT_QUEUE',
                       dequeue_options => l_dequeue_options,
                       message_properties => l_message_properties,
                       payload => l_event_msg,
                       msgid => l_message_handle);
    
        msg_text := utl_raw.cast_to_varchar2(l_event_msg);
    END IF;
    return msg_text;
END DEQUEUEMESSAGE;
/