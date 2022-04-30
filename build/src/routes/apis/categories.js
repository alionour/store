"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categories_1 = require("../../controllers/categories");
const controller = new categories_1.CategoryController();
// eslint-disable-next-line new-cap
const categories = (0, express_1.Router)();
categories.get('/', controller.index);
categories.get('/:id', controller.show);
categories.post('/', controller.create);
categories.delete('/', controller.delete);
exports.default = categories;
//# sourceMappingURL=categories.js.map