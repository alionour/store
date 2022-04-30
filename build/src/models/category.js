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
exports.CategoryStore = void 0;
const database_1 = __importDefault(require("../config/database"));
/**
 * class used to query categories from the store
 *
 * @export
 * @class CategoryStore
 */
class CategoryStore {
    /**
     * gets all categories from the store
     *
     * @return {*}  {Promise<Array<Category>>}
     * @memberof CategoryStore
     */
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM categories';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`cannot get categories ${error}`);
            }
        });
    }
    /**
     * gets one category by id from the store
     *
     * @param {number} id
     * @return {*}  {Promise<Category>}
     * @memberof CategoryStore
     */
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM categories WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find category ${id}. Error: ${err}`);
            }
        });
    }
    /**
     * creates a new category in the store
     *
     * @param {Category} p
     * @return {*}  {Promise<Category>}
     * @memberof CategoryStore
     */
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO categories (category)
            VALUES($1) RETURNING *`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn
                    .query(sql, [p.category]);
                const category = result.rows[0];
                conn.release();
                return category;
            }
            catch (err) {
                throw new Error(`Could not add new category ${p.category}. Error: ${err}`);
            }
        });
    }
    /**
     * deletes a category from the store
     *
     * @param {number} id
     * @return {*}  {Promise<Category>}
     * @memberof CategoryStore
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM categories WHERE id=($1) RETURNING *';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const category = result.rows[0];
                conn.release();
                return category;
            }
            catch (err) {
                throw new Error(`Could not delete category ${id}. Error: ${err}`);
            }
        });
    }
}
exports.CategoryStore = CategoryStore;
//# sourceMappingURL=category.js.map