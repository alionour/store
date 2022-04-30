"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.compareHash = void 0;
var bcrypt_1 = __importDefault(require("bcrypt"));
var pepper = process.env.PEPPER;
/**
 * compare hashes
 *
 * @export
 * @param {string} password
 * @param {string} hash
 * @return {*}  {string}
 */
function compareHash(password, hash) {
    var result = bcrypt_1["default"].compareSync(password + pepper, hash);
    return result;
}
exports.compareHash = compareHash;
