"use strict";
exports.__esModule = true;
var express_1 = require("express");
var categories_1 = require("../../controllers/categories");
var controller = new categories_1.CategoryController();
// eslint-disable-next-line new-cap
var categories = (0, express_1.Router)();
categories.get('/', controller.index);
categories.get('/:id', controller.show);
categories.post('/', controller.create);
categories["delete"]('/', controller["delete"]);
exports["default"] = categories;
