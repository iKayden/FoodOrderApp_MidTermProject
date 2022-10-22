-- CREATE TABLE customers (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(255) NOT NULL,
--   phone VARCHAR(255) NOT NULL,
--   isAdmin BOOLEAN DEFAULT FALSE
-- );

INSERT INTO customers (name, phone, isAdmin) VALUES ('AdminGuy', '8080', true);
INSERT INTO customers (name, phone, isAdmin) VALUES ('Kira', '123456', false);
INSERT INTO customers (name, phone, isAdmin) VALUES ('Alex', '123124', false);
INSERT INTO customers (name, phone, isAdmin) VALUES ('Dora', '123123123123124', false);
INSERT INTO customers (name, phone, isAdmin) VALUES ('Max', '312', false);
