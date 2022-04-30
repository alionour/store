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
exports.UserStore = void 0;
const database_1 = __importDefault(require("../config/database"));
const compare_hash_1 = require("../utils/compare_hash");
const create_token_1 = require("../utils/create_token");
const hash_password_1 = require("../utils/hash_password");
/**
 * class used to query users from the store
 *
 * @export
 * @class UserStore
 */
class UserStore {
    /**
     * gets all users from the store
     *
     * @return {*}  {Promise<Array<User>>}
     * @memberof UserStore
     */
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users';
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`cannot get users ${error}`);
            }
        });
    }
    /**
     * gets one user by id from the store
     *
     * @param {number} id
     * @return {*}  {Promise<User>}
     * @memberof UserStore
     */
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id}. Error: ${err}`);
            }
        });
    }
    /**
     * login the user
     *
     * @param {string} email
     * @param {string} password
     * @return {*}  {Promise<boolean>}
     * @memberof UserStore
     */
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'SELECT * FROM users WHERE email =($1);';
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [email]);
                conn.release();
                if (result.rowCount > 0) {
                    const user = result.rows[0];
                    const isValid = (0, compare_hash_1.compareHash)(password, user.password);
                    if (isValid) {
                        const token = (0, create_token_1.generateToken)(user);
                        return token;
                    }
                    else {
                        /// password is invalid
                        throw new Error("username or password is invalid");
                    }
                }
                else {
                    /// email is invalid
                    throw new Error("username or password is invalid");
                }
            }
            catch (error) {
                throw new Error(`username or password is invalid ${error}`);
            }
        });
    }
    /**
     * creates a new user in the store
     *
     * @param {User} u
     * @return {*}  {Promise<User>}
     * @memberof UserStore
     */
    signUp(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO users (firstname, email,lastname,password)
       VALUES($1, $2, $3,$4) RETURNING *`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn
                    .query(sql, [u.firstname, u.email, u.lastname, (0, hash_password_1.hashPassword)(u.password)]);
                const user = result.rows[0];
                conn.release();
                const token = (0, create_token_1.generateToken)(user);
                return token;
            }
            catch (err) {
                throw new Error(`Could not add new user ${u.firstname}.
       Error: ${err}`);
            }
        });
    }
    /**
     * creates a new user in the store
     *
     * @param {User} u
     * @return {*}  {Promise<User>}
     * @memberof UserStore
     */
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = `INSERT INTO users (firstname, email,lastname,password)
       VALUES($1, $2, $3,$4) RETURNING *`;
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn
                    .query(sql, [u.firstname, u.email, u.lastname, (0, hash_password_1.hashPassword)(u.password)]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not add new user ${u.firstname}.
       Error: ${err}`);
            }
        });
    }
    /**
     * deletes a user from the store
     *
     * @param {number} id
     * @return {*}  {Promise<User>}
     * @memberof UserStore
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const sql = 'DELETE FROM users WHERE id=($1)';
                // @ts-ignore
                const conn = yield database_1.default.connect();
                const result = yield conn.query(sql, [id]);
                const user = result.rows[0];
                conn.release();
                return user;
            }
            catch (err) {
                throw new Error(`Could not delete user ${id}. Error: ${err}`);
            }
        });
    }
}
exports.UserStore = UserStore;
//# sourceMappingURL=user.js.map