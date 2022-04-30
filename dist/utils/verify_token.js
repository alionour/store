"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * verifies a token
 *
 * @export
 * @param {string} token
 * @return {*}  {string}
 */
function verifyToken(token) {
    try {
        var secret = process.env.TOKEN_SECRET;
        jsonwebtoken_1["default"].verify(token, secret);
        return true;
    }
    catch (error) {
        throw new Error("can not verify token ".concat(error));
    }
}
exports.verifyToken = verifyToken;
