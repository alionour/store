"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const verify_token_1 = require("../utils/verify_token");
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
        // get the token from the header if present
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        (0, verify_token_1.verifyToken)(token);
        next();
    }
    catch (error) {
        res.status(401);
        res.json(`Invalid token ${error}`);
        return;
    }
}
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=authenticate_token.js.map