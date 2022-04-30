"use strict";
exports.__esModule = true;
var express_1 = require("express");
var authentication_1 = require("../../controllers/authentication");
var controller = new authentication_1.AuthenticationController();
// eslint-disable-next-line new-cap
var authentication = (0, express_1.Router)();
authentication.post('/login', controller.login);
authentication.post('/signup', controller.signup);
exports["default"] = authentication;
