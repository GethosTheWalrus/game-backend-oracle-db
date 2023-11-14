ALTER SESSION SET CONTAINER=FREEPDB1;
--------------------------------------------------------
--  File created - Monday-November-13-2023   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Table SCORES
--------------------------------------------------------

  CREATE TABLE "GAMEDB"."SCORES" 
   (	"ID" NUMBER GENERATED ALWAYS AS IDENTITY MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE , 
	"VALUE" NUMBER(38,0) DEFAULT 0, 
	"USER_ID" NUMBER(38,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  Constraints for Table SCORES
--------------------------------------------------------

  ALTER TABLE "GAMEDB"."SCORES" MODIFY ("VALUE" NOT NULL ENABLE);
  ALTER TABLE "GAMEDB"."SCORES" MODIFY ("USER_ID" NOT NULL ENABLE);
  ALTER TABLE "GAMEDB"."SCORES" ADD CONSTRAINT "SCORES_PK" PRIMARY KEY ("ID")  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table SCORES
--------------------------------------------------------

  ALTER TABLE "GAMEDB"."SCORES" ADD CONSTRAINT "FK_USERS" FOREIGN KEY ("USER_ID")
	  REFERENCES "GAMEDB"."USERS" ("ID") ENABLE;
