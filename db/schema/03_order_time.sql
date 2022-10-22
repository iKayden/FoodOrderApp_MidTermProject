-- Drop and recreate order_time table
DROP TABLE IF EXISTS order_time CASCADE;

CREATE TABLE order_time (
  id SERIAL PRIMARY KEY NOT NULL,
  place_time TIME NOT NULL,
  fullfilment_duration INTEGER NOT NULL
);