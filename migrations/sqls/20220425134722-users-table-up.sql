-- create users table
CREATE Table users(
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  firstname VARCHAR(50),
  lastname VARCHAR(50),
  -- hashed password
  password VARCHAR(350) NOT NULL
);