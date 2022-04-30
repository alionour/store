"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.PEPPER;
/**
 * compare hashes
 *
 * @export
 * @param {string} password
 * @param {string} hash
 * @return {*}  {string}
 */
function compareHash(password, hash) {
    const result = bcrypt_1.default.compareSync(password + pepper, hash);
    return result;
}
exports.compareHash = compareHash;
//# sourceMappingURL=compare_hash.js.map