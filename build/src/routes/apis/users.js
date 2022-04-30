"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../../controllers/users");
const auth_1 = require("../../middlewares/auth");
const controller = new users_1.UserController();
// eslint-disable-next-line new-cap
const users = (0, express_1.Router)();
users.get('/', auth_1.auth, controller.index);
users.get('/:id', auth_1.auth, controller.show);
users.post('/', auth_1.auth, controller.create);
users.delete('/', auth_1.auth, controller.delete);
exports.default = users;
//# sourceMappingURL=users.js.map