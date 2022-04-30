"use strict";
exports.__esModule = true;
exports.authenticateToken = void 0;
var verify_token_1 = require("../utils/verify_token");
/**
 * authenticate token
 *
 * @export
 * @param {Request} req
 * @param {Response} res
 * @return {*}
 */
function authenticateToken(req, res, next) {
    try {
        (0, verify_token_1.verifyToken)(req.headers['Authorization']);
        next();
    }
    catch (error) {
        res.status(401);
        res.json("Invalid token ".concat(error));
        return;
    }
}
exports.authenticateToken = authenticateToken;
