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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UserController = void 0;
var user_1 = require("../models/user");
var create_token_1 = require("../utils/create_token");
var hash_password_1 = require("../utils/hash_password");
/**
 * A controller for users
 *
 * @export
 * @class UserController
 */
var UserController = /** @class */ (function () {
    function UserController() {
    }
    /**
       * gets all users handler
       *
       * @param {Request} _req
       * @param {Response} res
       */
    UserController.prototype.index = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, UserController.store.index()];
                    case 1:
                        users = _a.sent();
                        return [2 /*return*/, res.json(users)];
                    case 2:
                        error_1 = _a.sent();
                        res.status(400);
                        res.json(error_1);
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * shows one user by id
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    UserController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = Number.parseInt(req.params.id);
                        return [4 /*yield*/, UserController.store.show(id)];
                    case 1:
                        user = _a.sent();
                        res.json(user);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        res.status(400);
                        res.json(error_2);
                        return [2 /*return*/];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * adds a new user
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof UserController
     */
    UserController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var password, hashedPassword, u, newUser, token, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = req.body.password;
                        hashedPassword = (0, hash_password_1.hashPassword)(password);
                        u = {
                            firstname: req.body.firstname,
                            lastname: req.body.password,
                            password: hashedPassword,
                            email: req.body.email
                        };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, UserController.store.create(u)];
                    case 2:
                        newUser = _a.sent();
                        token = (0, create_token_1.generateToken)({ user: newUser });
                        return [2 /*return*/, res.json(token)];
                    case 3:
                        error_3 = _a.sent();
                        res.status(400);
                        res.json(error_3);
                        return [2 /*return*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.store = new user_1.UserStore();
    return UserController;
}());
exports.UserController = UserController;
