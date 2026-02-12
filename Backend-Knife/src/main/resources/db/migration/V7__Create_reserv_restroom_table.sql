   CREATE SCHEMA IF NOT EXISTS knfc;

   CREATE TABLE IF NOT EXISTS knfc.reserv_restroom (
       id serial NOT NULL PRIMARY KEY,
       time varchar(20) not null,
       date date not null,
       description text,
       id_restroom smallint not null,
       FOREIGN KEY (id_restroom) REFERENCES restroom(id) ON UPDATE CASCADE ON DELETE RESTRICT
   );