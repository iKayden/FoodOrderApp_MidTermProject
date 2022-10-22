-- Drop and recreate cart_items table (Example)
DROP TABLE IF EXISTS cart_items CASCADE;

CREATE TABLE cart_items (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id),
  quantity INTEGER NOT NULL
);
