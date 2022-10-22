-- Drop and recreate payments table
DROP TABLE IF EXISTS payments CASCADE;

CREATE TABLE payments (
  id SERIAL PRIMARY KEY NOT NULL,
  isCash BOOLEAN NOT NULL DEFAULT true,
  order_id INTEGER REFERENCES orders(id)
);
