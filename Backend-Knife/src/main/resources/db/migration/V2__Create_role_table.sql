   CREATE SCHEMA IF NOT EXISTS knfc;

   CREATE TABLE IF NOT EXISTS knfc.role (
       id smallserial NOT NULL PRIMARY KEY,
       name varchar(50)
   );