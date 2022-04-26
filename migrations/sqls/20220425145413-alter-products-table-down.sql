-- remove fk_category that references categories table
ALTER TABLE
  products DROP CONSTRAINT fk_category;
-- chnage category_id to category
ALTER TABLE
  products RENAME COLUMN category_id TO category;
-- change category type to VARCHAR(255)
ALTER TABLE
  products
ALTER COLUMN
  category_id TYPE VARCHAR(255);