-- create table products
CREATE Table products(
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  price NUMERIC CONSTRAINT positive_price CHECK(price > 0),
  category VARCHAR(255)
);