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

