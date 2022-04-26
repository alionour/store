-- chnage category to category_id
ALTER TABLE
  products RENAME COLUMN category TO category_id;
-- change category type to INTEGER
  -- Explicit casting
ALTER TABLE
  products
ALTER COLUMN
  category_id TYPE INTEGER USING (category_id :: integer);
-- add fk_category that references categories table
ALTER TABLE
  products
ADD
  CONSTRAINT fk_category FOREIGN KEY(category_id) REFERENCES categories(id) ON UPDATE NO ACTION ON DELETE NO ACTION;