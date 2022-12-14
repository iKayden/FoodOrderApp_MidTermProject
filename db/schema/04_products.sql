-- Drop and recreate products table
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  description TEXT
);