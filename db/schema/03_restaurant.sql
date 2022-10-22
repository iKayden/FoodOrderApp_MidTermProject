-- Drop and recreate restaurant table
DROP TABLE IF EXISTS restaurant CASCADE;

CREATE TABLE restaurant (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL,
  product_id INTEGER REFERENCES products(id),
);