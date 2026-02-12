   CREATE SCHEMA IF NOT EXISTS knfc;

   CREATE TABLE IF NOT EXISTS knfc.reserv_reference (
       id bigserial NOT NULL PRIMARY KEY,
       time varchar(5),
       date date,
       phone varchar(16),
       email varchar(50),
       fio_client varchar(50),
       status boolean DEFAULT NULL,
       description text,
       description_admin text,
       date_bron timestamp,
       date_confirm_cancel timestamp,
       closedbron boolean DEFAULT FALSE,
       id_reference integer NOT NULL,
       count_person smallint,
       FOREIGN KEY (id_reference) REFERENCES reference(id) ON UPDATE CASCADE ON DELETE RESTRICT
   );

   CREATE UNIQUE INDEX IF NOT EXISTS unique_reservref ON reserv_reference (date, time, id_reference) WHERE status IS NOT FALSE;