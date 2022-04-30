# Storefront Backend Project
 **Storefront** is a backend project is built for an online store By **NODEJS** that provides a restful api that can be used by the frontend deeloper.

## Prerequists
- node
- docker [optional]
- yarn [optional]

## Project Setup
##### Database Setup
Start the postgres server:
connect to postgres
`psql -U postgres`
`create user user_name with encrypted password 'mypassword';`
Create the following databases if not
`CRAETE DATABASE store;`
`CRAETE DATABASE store_dev;`
`CRAETE DATABASE store_test;`
Do database migrations
`npm run migrate`

##### ENV Setup
Create a .env file at the root directory with all the required environment variables as follows :
```python
PORT=3001
PORT_DEV=4555
NODE_ENV= dev
# DATABASE CONFIGURATION HERE
POSTGRES_DB=store_dev
POSTGRES_PORT=POSTGRES_PORT_HERE
POSTGRES_DB_TEST=store_test
POSTGRES_DB_PROD=store_prod
POSTGRES_USER=POSTGRES_USER_HERE
POSTGRES_PASSWORD=POSTGRES_PASSWORD_HERE
POSTGRES_HOST=POSTGRES_HOST_HERE
# HASH CONFIG
SALT_ROUNDS=SALT_ROUNDS_HERE
PEPPER=PEPPER_HERE

# TOKEN
TOKEN_SECRET= TOKEN_SECRET_HERE


```
##### Scripts
___

| Script             | Usage                                                                                                     |
| ------------------ | --------------------------------------------------------------------------------------------------------- |
| `npm run start`    | Used to run the server.                                                                                   |
| `npm run test`     | Used to run all tests after building the server by **JS**.                                                |
| `npm run build`    | Used to transpile **TS** to **JS** on test database as specified in database.json file at root directory. |
| `npm run jasmine`  | Used to run all jasmine tests.                                                                            |
| `npm run prettier` | Used to apply all prettier configs.                                                                       |
| `npm run lint`     | Used to apply all eslint rules.                                                                           |
| `npm run migrate`  | Used to run all database migrations.                                                                      |
| `npm run jasmine`  | Used to undo all database migrations.                                                                     |
| `npm run watch`    | Used to run the app in watch mode.                                                                        |
___
#### Models

```js
export type Category = {
  id?: number;
  category: string;
};
```

```js
export type Order = {
  id?: number;
  product_id: number;
  user_id: number;
  quantity: number;
  status: string;
};
```
```js
export type Product = {
  id?: number;
  name: string;
  price: number;
  category_id: number;
};
```
```js
export type User = {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
};

};
```
#### Endpoints
[/](http://localhost:3001/)
    
    Landing route.
    GET METHOD.
    returns Json object.

[/api](http://localhost:3001/api/)
    
    Api route.
    GET METHOD.
    returns Json
###### Products Endpoints


[/api/products](http://localhost:3001/api/products/)
    
    GET METHOD.
    Returns all products.
    returns Json
[/api/products](http://localhost:3001/api/products/)
    
    POST METHOD.
    Returns the inserted product.
    requires body containing [name,price,category_id]
    Requires Authorization.
    returns Json
[/api/products](http://localhost:3001/api/products/)
    
    Delete METHOD.
    Returns the deleted product.
    Requires Authorization.
    Requires the [id] in body
    returns Json
[/api/products/:id](http://localhost:3001/api/products/1)
    
    Returns one product by id as req params
    GET METHOD.
    returns Json
[/api/products/top/5](http://localhost:3001/api/products/top/5)
    
    GET METHOD.
    Returns top products
    Requires [limit] as req params 
    Returns Json

[/api/products/category/1](http://localhost:3001/api/products/top/5)
    
    GET METHOD.
    Returns products by category.
    Requires [category_id] as req params 
    Returns Json
###### Categories Endpoints


[/api/categories](http://localhost:3001/api/categories/) 
    
    Returns all categories.
    GET METHOD.
    returns Json.

[/api/categories/:id](http://localhost:3001/api/categories/1)
    
    Returns one category by id as req params
    GET METHOD.
[/api/categories](http://localhost:3001/api/categories/)
    
    POST METHOD.
    Returns the inserted category.
    requires body containing [category]
    Requires Authorization.
    returns Json
[/api/categories](http://localhost:3001/api/categories/)
    
    Delete METHOD.
    Returns the deleted category.
    Requires Authorization.
    Requires the [id] in body
    returns Json
###### Users Endpoints

[/api/users](http://localhost:3001/api/users/) 
    
    requires [**Authorization**]
    Returns all users.
    GET METHOD.
    returns Json.

[/api/users/:id](http://localhost:3001/api/users/1)
    
    requires [**Authorization**]
    Returns one product by id as req params
    GET METHOD.
[/api/users](http://localhost:3001/api/users/)
    
    POST METHOD.
    Returns the inserted user.
    requires body containing [name,price,category_id]
    Requires Authorization.
    returns Json
[/api/users](http://localhost:3001/api/users/)
    
    Delete METHOD.
    Returns the deleted user.
    Requires Authorization.
    Requires the [id] in body
    returns Json
###### Orders Endpoints

[/api/orders](http://localhost:3001/api/orders/) 
    
    requires [**Authorization**]
    Returns all orders;
    GET METHOD.
    returns Json.
[/api/orders/:id](http://localhost:3001/api/orders/1)
    
    requires [**Authorization**]
    Returns one order by id as req params
    GET METHOD.
[/api/orders](http://localhost:3001/api/orders/)
    
    POST METHOD.
    Returns the inserted order.
    requires body containing [user_id,product_id,status,quantity]
    Requires Authorization.
    returns Json
[/api/orders](http://localhost:3001/api/orders/)
    
    Delete METHOD.
    Returns the deleted order.
    Requires Authorization.
    Requires the [id] in body
    returns Json
###### Dashboard Endpoints

[/api/dashboard/usersWithOrders](http://localhost:3001/api/dashboard/usersWithOrders) 
    
    requires [**Authorization**]
    Returns all users having orders;
    GET METHOD.
    returns Json.
[/api/dashboard/topProducts](http://localhost:3001/api/dashboard/topProducts) 
    
    requires [**Authorization**]
    Returns all top ordered products;
    GET METHOD.
    returns Json.
[/api/dashboard/productsInOrders](http://localhost:3001/api/dashboard/productsInOrders) 
    
    requires [**Authorization**]
    Returns all products included in orders;
    GET METHOD.
    returns Json.