"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
let { NODE_ENV, POSTGRES_HOST, POSTGRES_DB, POSTGRES_DB_TEST, POSTGRES_DB_PROD, POSTGRES_USER, POSTGRES_PASSWORD, } = process.env;
let dbClient;
if (NODE_ENV === 'dev') {
    dbClient = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (NODE_ENV === 'test') {
    dbClient = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
if (NODE_ENV === 'prod') {
    dbClient = new pg_1.Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_PROD,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}
exports.default = dbClient;
//# sourceMappingURL=database.js.map