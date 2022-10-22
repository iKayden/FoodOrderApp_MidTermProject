DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  total_cost INTEGER NOT NULL,
  order_date DATE NOT NULL DEFAULT NOW
  restaurant_id INTEGER REFERENCES restaurant(id)
);