-- CREATE TABLE cart_items (
--   id SERIAL PRIMARY KEY NOT NULL,
--   order_id INTEGER REFERENCES orders(id),
  -- product_id INTEGER REFERENCES products(id),
--   quantity INTEGER NOT NULL
-- );

INSERT INTO cart_items (order_id, product_id, quantity) VALUES (1, 2, 5);
INSERT INTO cart_items (order_id, product_id, quantity) VALUES (2, 3, 3);
INSERT INTO cart_items (order_id, product_id, quantity) VALUES (3, 1, 1);
