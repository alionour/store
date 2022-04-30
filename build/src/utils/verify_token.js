"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * verifies a token
 *
 * @export
 * @param {string} token
 * @return {*}  {string}
 */
function verifyToken(token) {
    try {
        const secret = process.env.TOKEN_SECRET;
        jsonwebtoken_1.default.verify(token, secret);
        return true;
    }
    catch (error) {
        throw new Error(`can not verify token ${error}`);
    }
}
exports.verifyToken = verifyToken;
//# sourceMappingURL=verify_token.js.map