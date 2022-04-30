"use strict";
exports.__esModule = true;
var express_1 = require("express");
var orders_1 = require("../../controllers/orders");
var authenticate_token_1 = require("../../middlewares/authenticate_token");
var controller = new orders_1.OrderController();
// eslint-disable-next-line new-cap
var orders = (0, express_1.Router)();
orders.get('/', authenticate_token_1.authenticateToken, controller.index);
orders.get('/:id', authenticate_token_1.authenticateToken, controller.show);
orders.get('/user/:userId', authenticate_token_1.authenticateToken, controller.showOrdersByUserId);
orders.get('/user/complete/:userId', authenticate_token_1.authenticateToken, controller.showCompletedOrdersByUserId);
orders.get('/user/active/:userId', authenticate_token_1.authenticateToken, controller.showActiveOrdersByUserId);
orders.post('/', authenticate_token_1.authenticateToken, controller.create);
exports["default"] = orders;
