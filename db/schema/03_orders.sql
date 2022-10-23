-- Drop and recreate orders table
DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  phone VARCHAR(255) NOT NULL,
  total_cost INTEGER NOT NULL
);
  -- order_date DATE NOT NULL,
  -- order_time_id INTEGER REFERENCES order_time(id)