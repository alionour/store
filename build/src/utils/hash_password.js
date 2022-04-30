"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = process.env.SALT_ROUNDS;
const pepper = process.env.PEPPER;
/**
 * hashes the given password through bcrypt
 *
 * @export
 * @param {string} password
 * @return {*}  {string}
 */
function hashPassword(password) {
    const hash = bcrypt_1.default.hashSync(password + pepper, parseInt(saltRounds));
    return hash;
}
exports.hashPassword = hashPassword;
//# sourceMappingURL=hash_password.js.map