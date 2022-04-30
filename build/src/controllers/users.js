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
exports.UserController = void 0;
const user_1 = require("../models/user");
const hash_password_1 = require("../utils/hash_password");
/**
 * A controller for users
 *
 * @export
 * @class UserController
 */
class UserController {
    /**
       * gets all users handler
       *
       * @param {Request} _req
       * @param {Response} res
       */
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield UserController.store.index();
                return res.json(users);
            }
            catch (error) {
                res.status(400);
                res.json(error);
                return;
            }
        });
    }
    /**
     * shows one user by id
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number.parseInt(req.params.id);
                const user = yield UserController.store.show(id);
                res.json(user);
            }
            catch (error) {
                res.status(400);
                res.json(error);
                return;
            }
        });
    }
    /**
     * adds a new user
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const password = req.body.password;
            const hashedPassword = (0, hash_password_1.hashPassword)(password);
            const u = {
                firstname: req.body.firstname,
                lastname: req.body.password,
                password: hashedPassword,
                email: req.body.email,
            };
            try {
                const newUser = yield UserController.store.create(u);
                res.status(201);
                return res.json(newUser);
            }
            catch (error) {
                res.status(400);
                res.json(error);
                return;
            }
        });
    }
    /**
   * deletes user by id
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const user = yield UserController.store.delete(id);
            res.json(user);
        });
    }
}
exports.UserController = UserController;
UserController.store = new user_1.UserStore();
//# sourceMappingURL=users.js.map