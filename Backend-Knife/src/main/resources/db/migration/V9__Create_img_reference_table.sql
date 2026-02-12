   CREATE SCHEMA IF NOT EXISTS knfc;

   CREATE TABLE IF NOT EXISTS knfc.img_reference (
       id serial NOT NULL PRIMARY KEY,
       url_img text
   );