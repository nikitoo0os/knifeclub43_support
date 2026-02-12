   CREATE SCHEMA IF NOT EXISTS knfc;

   CREATE TABLE IF NOT EXISTS knfc.person (
       id serial NOT NULL PRIMARY KEY,
       login varchar(30) NOT NULL,
       password text,
       token text,
       id_role smallint,
       FOREIGN KEY (id_role) REFERENCES role(id) ON UPDATE CASCADE ON DELETE RESTRICT
   );