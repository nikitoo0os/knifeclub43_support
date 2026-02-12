CREATE SCHEMA IF NOT EXISTS knfc;

ALTER TABLE knfc.reference
ADD COLUMN description_client text;