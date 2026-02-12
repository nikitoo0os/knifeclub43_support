----ПРОВЕРКА TABLESPACE
--    IF NOT EXISTS (SELECT 1 FROM pg_tablespace WHERE spcname = 'knfc_ts') THEN
--        CREATE TABLESPACE knfc_ts
--        LOCATION 'D:/knf_DataBase_New';

----ПРОВЕРКА DATABASE
--    SELECT 'CREATE DATABASE knfc TABLESPACE knfc_ts'
--    WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'knfc')\gexec

----Подключение к бд
--\c knfc;

----ПРОВЕРКА НАЛИЧИЯ СХЕМЫ
--    IF NOT EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'knfc') THEN
--        CREATE SCHEMA knfc;