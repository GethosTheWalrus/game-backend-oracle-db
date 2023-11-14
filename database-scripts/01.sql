ALTER SESSION SET CONTAINER=FREEPDB1;
create user GAMEDB identified by "password";
grant create session to "GAMEDB";
alter user GAMEDB quota unlimited on USERS;