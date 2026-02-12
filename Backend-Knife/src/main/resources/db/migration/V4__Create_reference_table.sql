    CREATE SCHEMA IF NOT EXISTS knfc;

    CREATE TABLE IF NOT EXISTS knfc.reference (
            id serial NOT NULL PRIMARY KEY,
            name varchar(150) NOT NULL,
            description text,
            url_img text,
            duration integer NOT NULL,
            time_start varchar(5) NOT NULL,
            time_end varchar(5) NOT NULL,
            time_start_holiday varchar(5) NOT NULL,
            time_end_holiday varchar(5) NOT NULL,
            price numeric CHECK (price > 0),
            status_visible boolean DEFAULT true
    );