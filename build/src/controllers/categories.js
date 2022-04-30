"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_1 = require("../models/category");
/**
 * A controller for categories
 *
 * @export
 * @class CategoryController
 */
class CategoryController {
    /**
       * gets all categories handler
       *
       * @param {Request} _req
       * @param {Response} res
       */
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield CategoryController.store.index();
            res.json(categories);
            res.status(200);
        });
    }
    /**
     * shows one category by id
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof CategoryController
     */
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number.parseInt(req.params.id);
            const category = yield CategoryController.store.show(id);
            res.json(category);
            res.status(200);
        });
    }
    /**
     * adds a new category
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof CategoryController
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = {
                category: req.body.category,
            };
            const category = yield CategoryController.store.create(p);
            res.status(201);
            return res.json(category);
        });
    }
    /**
     * deletes category by id
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof CategoryController
     */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const category = yield CategoryController.store.delete(id);
            res.json(category);
            return res.status(200);
        });
    }
}
exports.CategoryController = CategoryController;
CategoryController.store = new category_1.CategoryStore();
//# sourceMappingURL=categories.js.map