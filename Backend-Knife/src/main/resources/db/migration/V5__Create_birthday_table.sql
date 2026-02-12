    CREATE SCHEMA IF NOT EXISTS knfc;

    CREATE TABLE IF NOT EXISTS knfc.birthday (
            id serial NOT NULL PRIMARY KEY,
            name varchar(150) NOT NULL,
            description_price text,
            description_reference text,
            url_img text,
            status boolean DEFAULT true
    );