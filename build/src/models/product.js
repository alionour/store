"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductStore = void 0;
const database_1 = __importDefault(require("../config/database"));
/**
 * class used to query products from the store
 *
 * @export
 * @class ProductStore
 */
class ProductStore {
    /**
     * gets all products from the store
     *
     * @return {*}  {Promise<Array<Product>>}
     * @memberof ProductStore
     */
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`cannot get products ${error}`);
            }
        });
    }
    /**
     * gets one product by id from the store
     *
     * @param {number} id
     * @return {*}  {Promise<Product>}
     * @memberof ProductStore
     */
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find product ${id}. Error: ${err}`);
            }
        });
    }
    /**
     * creates a new product in the store
     *
     * @param {Product} p
     * @return {*}  {Promise<Product>}
     * @memberof ProductStore
     */
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO products (name, price,category_id)
       VALUES($1, $2, $3) RETURNING *`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn
                    .query(sql, [p.name, p.price, p.category_id]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
            }
        });
    }
    /**
     * deletes a product from the store
     *
     * @param {number} id
     * @return {*}  {Promise<Product>}
     * @memberof ProductStore
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM products WHERE id=($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const product = result.rows[0];
                conn.release();
                return product;
            }
            catch (err) {
                throw new Error(`Could not delete product ${id}. Error: ${err}`);
            }
        });
    }
    /**
     * gets products by category
     *
     * @param {string} category_id
     * @return {*}  {Promise<Array<Product>>}
     * @memberof ProductStore
     */
    showProductsByCategory(category_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM products WHERE category_id =($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [category_id]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Could not find products ${category_id}. Error: ${err}`);
            }
        });
    }
}
exports.ProductStore = ProductStore;
//# sourceMappingURL=product.js.map