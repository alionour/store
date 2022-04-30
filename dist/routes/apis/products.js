"use strict";
exports.__esModule = true;
var express_1 = require("express");
var products_1 = require("../../controllers/products");
var authenticate_token_1 = require("../../middlewares/authenticate_token");
var controller = new products_1.ProductController();
// eslint-disable-next-line new-cap
var products = (0, express_1.Router)();
products.get('/', controller.index);
products.get('/top5/:limit=5', controller.showTopProducts);
products.get('/:id', controller.show);
products.get('/category/:category', controller.showProductsByCategory);
products.post('/', authenticate_token_1.authenticateToken, controller.create);
products["delete"]('/', authenticate_token_1.authenticateToken, controller["delete"]);
exports["default"] = products;
