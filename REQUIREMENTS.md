## API Endpoints
#### Products
-[Added]  Index  
-[Added]  Show
-[Added]  Create [token required]
-[Added]  [OPTIONAL] Top 5 most popular products 
-[Added]  [OPTIONAL] Products by category (args: product category)

#### Users
-[Added]  Index [token required]
-[Added]  Show [token required]
-[Added]  Create N[token required]

#### Orders
-[Added] Current Order by user (args: user id)[token required]
-[Added] [OPTIONAL] Completed Orders by user (args: user id)[token required]

## Data Shapes
#### category
-  id
- category

#### Product
-  id
- name
- price
- [OPTIONAL] category_id

#### User
- id
- firstName
- lastName
- email
- password

 #### Orders
- id
- product_id
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Schema
___
     Table "public.categories"

```sql
-- Table: public.categories

-- DROP TABLE IF EXISTS public.categories;

CREATE TABLE IF NOT EXISTS public.categories
(
    id integer NOT NULL DEFAULT nextval('categories_id_seq'::regclass),
    category character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT categories_pkey PRIMARY KEY (id)
)
```
| Column   | Type                   | collation | Nullable | Default                                |
| -------- | ---------------------- | --------- | -------- | -------------------------------------- |
| id       | integer                |           | not null | nextval('categories_id_seq'::regclass) |
| category | character varying(255) |           |          |
- Indexes:
    - "categories_pkey" PRIMARY KEY, btree (id)
- Referenced by:
    - TABLE "products" CONSTRAINT "fk_category" FOREIGN KEY (category_id) REFERENCES categories(id)

___
     Table "public.orders"

```sql
-- create enum
CREATE TYPE order_status AS ENUM ('active', 'complete');

-- Table: public.orders

-- DROP TABLE IF EXISTS public.orders;

CREATE TABLE IF NOT EXISTS public.orders
(
    id integer NOT NULL DEFAULT nextval('orders_id_seq'::regclass),
    product_id integer,
    user_id integer,
    quantity integer,
    status order_status,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT orders_product_id_fkey FOREIGN KEY (product_id)
        REFERENCES public.products (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
```
| Column     | Type         | collation | Nullable | Default                            |
| ---------- | ------------ | --------- | -------- | ---------------------------------- |
| id         | integer      |           | not null | nextval('orders_id_seq'::regclass) |
| product_id | integer      |           |          |
| user_id    | integer      |           |          |
| quantity   | integer      |           |          |
| status     | order_status |           |          |
- Indexes:
   - "orders_pkey" PRIMARY KEY, btree (id)
- Foreign-key constraints:
    - "orders_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id)
    - "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

___
     Table "public.products"

```sql
-- Table: public.products

-- DROP TABLE IF EXISTS public.products;

CREATE TABLE IF NOT EXISTS public.products
(
    id integer NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    name character varying(255) COLLATE pg_catalog."default",
    price numeric,
    category_id integer,
    CONSTRAINT products_pkey PRIMARY KEY (id),
    CONSTRAINT fk_category FOREIGN KEY (category_id)
        REFERENCES public.categories (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT positive_price CHECK (price > 0::numeric)
)


```
| Column      | Type                   | collation | Nullable | Default                              |
| ----------- | ---------------------- | --------- | -------- | ------------------------------------ |
| id          | integer                |           | not null | nextval('products_id_seq'::regclass) |
| name        | character varying(255) |           |          |
| price       | numeric                |           |          |
| category_id | integer                |           |          |
- Indexes:
    - "products_pkey" PRIMARY KEY, btree (id)
    - Check constraints:
    "positive_price" CHECK (price > 0::numeric)
- Foreign-key constraints:
    - "fk_category" FOREIGN KEY (category_id) REFERENCES categories(id).
    - Referenced by:
    TABLE "orders" CONSTRAINT "orders_product_id_fkey" FOREIGN KEY (product_id) REFERENCES products(id).

___
     Table "public.users"


```sql
-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    firstname character varying(50) COLLATE pg_catalog."default",
    lastname character varying(50) COLLATE pg_catalog."default",
    password character varying(350) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

```
| Column    | Type                   | collation | Nullable | Default                           |
| --------- | ---------------------- | --------- | -------- | --------------------------------- |
| id        | integer                |           | not null | nextval('users_id_seq'::regclass) |
| email     | character varying(255) |           | not null |
| firstname | character varying(50)  |           |          |
| lastname  | character varying(50)  |           |          |
| password  | character varying(350) |           | not null |
- Indexes:
    - "users_pkey" PRIMARY KEY, btree (id)
    - "users_email_key" UNIQUE CONSTRAINT, btree (email)
- Referenced by:
    - TABLE "orders" CONSTRAINT "orders_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id)

 ___