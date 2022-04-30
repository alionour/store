import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

let {
  NODE_ENV,
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  POSTGRES_DB_PROD,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
} = process.env;

let dbClient!: Pool;

if (NODE_ENV === "dev") {
  dbClient = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}
if (NODE_ENV === "test") {
  dbClient = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_TEST,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (NODE_ENV === "prod") {
  dbClient = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB_PROD,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default dbClient;
