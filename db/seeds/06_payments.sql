-- CREATE TABLE payments (
--   id SERIAL PRIMARY KEY NOT NULL,
--   isCash BOOLEAN NOT NULL DEFAULT true,
--   order_id INTEGER REFERENCES orders(id)
-- );

INSERT INTO payments (isCash, order_id) VALUES (true, 1);
INSERT INTO payments (isCash, order_id) VALUES (false, 2);
INSERT INTO payments (isCash, order_id) VALUES (true, 3);
