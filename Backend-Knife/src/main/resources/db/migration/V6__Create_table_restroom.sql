    CREATE SCHEMA IF NOT EXISTS knfc;

    CREATE TABLE IF NOT EXISTS knfc.restroom (
            id smallserial NOT NULL PRIMARY KEY,
            name varchar(150) NOT NULL,
            url_img text
    );