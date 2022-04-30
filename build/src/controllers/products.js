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
exports.ProductController = void 0;
const product_1 = require("../models/product");
const dashboard_1 = require("../services/dashboard");
/**
 * A controller for products
 *
 * @export
 * @class ProductController
 */
class ProductController {
    /**
       * gets all products handler
       *
       * @param {Request} _req
       * @param {Response} res
       */
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield ProductController.store.index();
            res.json(products);
        });
    }
    /**
     * shows one product by id
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof ProductController
     */
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number.parseInt(req.params.id);
            const product = yield ProductController.store.show(id);
            res.json(product);
        });
    }
    /**
     * shows top proucts
     * requires limit
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof ProductController
     */
    showTopProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let limit;
            if (!req.params.limit) {
                limit = 5;
            }
            else {
                limit = req.params.limit;
            }
            const products = yield ProductController.dashboard.topProducts(limit);
            res.json(products);
        });
    }
    /**
     * adds a new product
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof ProductController
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = {
                name: req.body.name,
                price: req.body.price,
                category_id: req.body.category,
            };
            const product = yield ProductController.store.create(p);
            res.status(201);
            return res.json(product);
        });
    }
    /**
     * shows products by category
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof ProductController
     */
    showProductsByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category_id = parseInt(req.params.category_id);
            const products = yield ProductController.store.showProductsByCategory(category_id);
            res.json(products);
        });
    }
    /**
     * deletes product by id
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof ProductController
     */
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const product = yield ProductController.store.delete(id);
            res.json(product);
        });
    }
}
exports.ProductController = ProductController;
ProductController.store = new product_1.ProductStore();
ProductController.dashboard = new dashboard_1.DashboardQueries();
//# sourceMappingURL=products.js.map