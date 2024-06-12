ALTER SESSION SET CONTAINER=FREEPDB1;
-- create our DB user and modify its permissions
create user GAMEDB identified by "MySecurePassword123";
grant create session to "GAMEDB";
alter user GAMEDB quota unlimited on USERS;
GRANT EXECUTE ON DBMS_AQ to GAMEDB;
GRANT EXECUTE ON DBMS_AQADM to GAMEDB;
GRANT AQ_ADMINISTRATOR_ROLE TO GAMEDB;
GRANT ADMINISTER DATABASE TRIGGER TO GAMEDB;