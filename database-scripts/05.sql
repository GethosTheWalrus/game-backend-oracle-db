ALTER SESSION SET CONTAINER=FREEPDB1;
-- seed the database with some starter data
insert into GAMEDB.USERS t (username) values ('BigBird');
insert into GAMEDB.SCORES t (value, user_id) values (5, 1), (9, 1);

commit;