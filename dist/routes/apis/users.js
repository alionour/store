"use strict";
exports.__esModule = true;
var express_1 = require("express");
var users_1 = require("../../controllers/users");
var authenticate_token_1 = require("../../middlewares/authenticate_token");
var controller = new users_1.UserController();
// eslint-disable-next-line new-cap
var users = (0, express_1.Router)();
users.get('/', authenticate_token_1.authenticateToken, controller.index);
users.get('/:id', authenticate_token_1.authenticateToken, controller.show);
users.post('/', authenticate_token_1.authenticateToken, controller.create);
exports["default"] = users;
