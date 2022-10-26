-- Drop and recreate orders table AND order status type
DROP TABLE IF EXISTS orders CASCADE;
DROP TYPE IF EXISTS ORDERSTATUS CASCADE;

--(Enum type) Add ORDERSTATUS type to limit the input. 0: unconfirmed, 1: confirmed, 2: finished
CREATE TYPE ORDERSTATUS AS ENUM ('UNCONFIRMED','CONFIRMED','FINISHED');
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  phone VARCHAR(255) NOT NULL,
  total_cost INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  ready_at TIMESTAMP,
  status ORDERSTATUS DEFAULT 'UNCONFIRMED'
);
  -- order_date DATE NOT NULL,
  -- order_time_id INTEGER REFERENCES order_time(id)
