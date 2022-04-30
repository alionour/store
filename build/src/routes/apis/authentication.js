"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = require("../../controllers/authentication");
const controller = new authentication_1.AuthenticationController();
// eslint-disable-next-line new-cap
const authentication = (0, express_1.Router)();
authentication.post('/login', controller.login);
authentication.post('/signup', controller.signup);
exports.default = authentication;
//# sourceMappingURL=authentication.js.map