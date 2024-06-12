ALTER SESSION SET CONTAINER=FREEPDB1;
--------------------------------------------------------
--  File created - Monday-November-13-2023   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for View PLAYER_SCORES
--------------------------------------------------------

  CREATE OR REPLACE FORCE EDITIONABLE JSON RELATIONAL DUALITY VIEW "GAMEDB"."PLAYER_SCORES"  AS 
  select json {'_id' : u.ID, 'username' : u.USERNAME,
             'scores' :
               [ select json {'id' : s.ID, 'value' : s.VALUE}
                 from   SCORES s with insert update delete
                 where  s.USER_ID = u.ID  
               ]}
from USERS u with insert update delete
;