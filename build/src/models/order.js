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
exports.OrderStore = void 0;
const database_1 = __importDefault(require("../config/database"));
/**
 * class used to query orders from the store
 *
 * @export
 * @class OrderStore
 */
class OrderStore {
    /**
     * gets all orders from the store
     *
     * @return {*}  {Promise<Array<Order>>}
     * @memberof OrderStore
     */
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM orders';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`cannot get orders ${error}`);
            }
        });
    }
    /**
     * gets one order by id from the store
     *
     * @param {number} id
     * @return {*}  {Promise<Order>}
     * @memberof OrderStore
     */
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM orders WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find order ${id}. Error: ${err}`);
            }
        });
    }
    /**
     * creates a new order in the store
     *
     * @param {Order} o
     * @return {*}  {Promise<Order>}
     * @memberof OrderStore
     */
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO orders (product_id,quantity, user_id,status)
       VALUES($1, $2, $3,$4) RETURNING *`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn
                    .query(sql, [o.product_id, o.quantity, o.user_id, o.status]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not add new order ${o.product_id}. Error: ${err}`);
            }
        });
    }
    /**
     * deletes a order from the store
     *
     * @param {number} id
     * @return {*}  {Promise<Order>}
     * @memberof OrderStore
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM orders WHERE id=($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const order = result.rows[0];
                conn.release();
                return order;
            }
            catch (err) {
                throw new Error(`Could not delete order ${id}. Error: ${err}`);
            }
        });
    }
    /**
     * shows all orders related to userId
     *
     * @param {number} userId
     * @return {*}  {Promise<Array<Product>>}
     * @memberof OrderStore
     */
    showOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT * FROM orders WHERE user_id= ($1)';
            const result = yield conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        });
    }
    /**
     * shows all completed orders related to userId
     *
     * @param {number} userId
     * @return {*}  {Promise<Array<Product>>}
     * @memberof OrderStore
     */
    showCompletedOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE
     user_id = ($1) and status = 'complete'`;
            const result = yield conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        });
    }
    /**
     * shows all active orders related to userId
     *
     * @param {number} userId
     * @return {*}  {Promise<Array<Product>>}
     * @memberof OrderStore
     */
    showActiveOrdersByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = `SELECT * FROM orders WHERE
         user_id = ($1) and status = 'active'; `;
            const result = yield conn.query(sql, [userId]);
            conn.release();
            return result.rows;
        });
    }
}
exports.OrderStore = OrderStore;
//# sourceMappingURL=order.js.map