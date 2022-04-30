"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * creates a token
 *
 * @export
 * @param {Object} payload
 * @return {*}  {string}
 */
function generateToken(payload) {
    const secret = process.env.TOKEN_SECRET;
    const token = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: '72h',
    });
    return token;
}
exports.generateToken = generateToken;
//# sourceMappingURL=create_token.js.map