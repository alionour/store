"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_1 = require("../../controllers/products");
const auth_1 = require("../../middlewares/auth");
const controller = new products_1.ProductController();
// eslint-disable-next-line new-cap
const products = (0, express_1.Router)();
products.get('/', (controller.index));
products.get('/top/:limit', controller.showTopProducts);
products.get('/:id', controller.show);
products.get('/category/:category_id', controller.showProductsByCategory);
products.post('/', auth_1.auth, controller.create);
products.delete('/', auth_1.auth, controller.delete);
exports.default = products;
//# sourceMappingURL=products.js.map