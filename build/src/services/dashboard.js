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
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../config/database"));
/**
 * A service file is a place to write extra business logic
 * that does not belong in a handler or a model or orchestrates
 * changes with multiple models.
 *
 * @export
 * @class DashboardQueries
 */
class DashboardQueries {
    /**
     * Get all users that have made orders
     *
     * @return {*}  {Promise<{firstName: string, lastName: string}[]>}
     * @memberof DashboardQueries
     */
    usersWithOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id;';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable get users with orders: ${err}`);
            }
        });
    }
    /**
     * Get all products that have been included in orders
     *
     * @return {*}  {Promise<{name: string, price: number, order_id: string}[]>}
     * @memberof DashboardQueries
     */
    productsInOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT products.name, products.price, orders.id FROM products
       INNER JOIN orders ON producta.id = orders.product_id ;`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`unable get products and orders: ${err}`);
            }
        });
    }
    /**
    * gets the top popular products
    *
    * @return {*}  {Promise<Array<Product>>}
    * @memberof OrderStore
    */
    topProducts(limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = `SELECT products.* FROM
            orders JOIN products ON orders.product_id = products.id
            JOIN categories on products.category_id = categories.id 
            GROUP BY products.id ORDER BY COUNT(*) DESC LIMIT ${limit};`;
            const result = yield conn.query(sql);
            conn.release();
            return result.rows;
        });
    }
}
exports.DashboardQueries = DashboardQueries;
//# sourceMappingURL=dashboard.js.map