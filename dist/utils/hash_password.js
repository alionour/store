"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.hashPassword = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var saltRounds = process.env.SALT_ROUNDS;
var pepper = process.env.PEPPER;
/**
 * hashes the given password through bcrypt
 *
 * @export
 * @param {string} password
 * @return {*}  {string}
 */
function hashPassword(password) {
    var hash = bcrypt_1["default"].hashSync(password + pepper, parseInt(saltRounds));
    return hash;
}
exports.hashPassword = hashPassword;
