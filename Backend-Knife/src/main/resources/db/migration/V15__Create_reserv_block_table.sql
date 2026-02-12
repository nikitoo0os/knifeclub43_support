   CREATE SCHEMA IF NOT EXISTS knfc;

   CREATE TABLE IF NOT EXISTS knfc.reserv_block (
       id serial NOT NULL PRIMARY KEY,
       time_start_block varchar(5) NOT NULL,
       time_end_block varchar(5) NOT NULL,
       date date NOT NULL,
       date_confirm timestamp
   );