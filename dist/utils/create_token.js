"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.generateToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * creates a token
 *
 * @export
 * @param {Object} payload
 * @return {*}  {string}
 */
function generateToken(payload) {
    var secret = process.env.TOKEN_SECRET;
    var token = jsonwebtoken_1["default"].sign(payload, secret, {
        expiresIn: '72h'
    });
    return token;
}
exports.generateToken = generateToken;
