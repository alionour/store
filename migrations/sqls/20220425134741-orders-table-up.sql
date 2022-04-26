-- create enum
CREATE TYPE order_status AS ENUM ('active', 'complete');
-- create table orders
CREATE Table orders(
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id),
  user_id INTEGER REFERENCES users(id),
  quantity INTEGER,
  status order_status
)