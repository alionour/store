"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationController = void 0;
const user_1 = require("../models/user");
const create_token_1 = require("../utils/create_token");
class AuthenticationController {
    /**
     * login Handler
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof AuthenticationController
     */
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield AuthenticationController.store.login(req.body.email, req.body.password);
                res.json(token);
                res.status(200);
            }
            catch (error) {
                throw new Error(`can not login in ${error}`);
            }
        });
    }
    /**
     * signup handler
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof AuthenticationController
     */
    signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const u = {
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: req.body.password
                };
                const newUser = yield AuthenticationController.store.signUp(u);
                const token = (0, create_token_1.generateToken)({ user: newUser });
                res.status(201);
                res.json(token);
            }
            catch (error) {
                throw new Error(`can not sign up in ${error}`);
            }
        });
    }
}
exports.AuthenticationController = AuthenticationController;
AuthenticationController.store = new user_1.UserStore();
//# sourceMappingURL=authentication.js.map