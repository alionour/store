"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orders_1 = require("../../controllers/orders");
const auth_1 = require("../../middlewares/auth");
const controller = new orders_1.OrderController();
// eslint-disable-next-line new-cap
const orders = (0, express_1.Router)();
orders.get('/', auth_1.auth, controller.index);
orders.get('/:id', auth_1.auth, controller.show);
orders.get('/user/:userId', auth_1.auth, controller.showOrdersByUserId);
orders.get('/user/complete/:userId', auth_1.auth, controller.showCompletedOrdersByUserId);
orders.get('/user/active/:userId', auth_1.auth, controller.showActiveOrdersByUserId);
orders.post('/', auth_1.auth, controller.create);
orders.delete('/', auth_1.auth, controller.delete);
exports.default = orders;
//# sourceMappingURL=orders.js.map