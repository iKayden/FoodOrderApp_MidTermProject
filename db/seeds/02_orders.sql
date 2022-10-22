-- CREATE TABLE orders (
--   id SERIAL PRIMARY KEY NOT NULL,
--   customer_id INTEGER REFERENCES customers(id),
--   total_cost INTEGER NOT NULL,
--   order_date DATE NOT NULL DEFAULT NOW
--   order_time_id INTEGER REFERENCES order_time(id)
-- );

INSERT INTO orders (customer_id, total_cost, order_date, order_time_id) 
VALUES (1 , 1000, '1992-02-01', 1);
INSERT INTO orders (customer_id, total_cost, order_date, order_time_id) 
VALUES (2 , 2000, '2992-02-02', 2);
INSERT INTO orders (customer_id, total_cost, order_date, order_time_id) 
VALUES (1 , 3000, '2000-02-03', 3);
