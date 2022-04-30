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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.ProductController = void 0;
var product_1 = require("../models/product");
var dashboard_1 = require("../services/dashboard");
/**
 * A controller for products
 *
 * @export
 * @class ProductController
 */
var ProductController = /** @class */ (function () {
    function ProductController() {
    }
    /**
       * gets all products handler
       *
       * @param {Request} _req
       * @param {Response} res
       */
    ProductController.prototype.index = function (_req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ProductController.store.index()];
                    case 1:
                        products = _a.sent();
                        res.json(products);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * shows one product by id
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof ProductController
     */
    ProductController.prototype.show = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = Number.parseInt(req.params.id);
                        return [4 /*yield*/, ProductController.store.show(id)];
                    case 1:
                        product = _a.sent();
                        res.json(product);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * shows top proucts
     * requires limit
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof ProductController
     */
    ProductController.prototype.showTopProducts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = req.params.limit;
                        return [4 /*yield*/, ProductController.dashboard.topProducts(limit)];
                    case 1:
                        products = _a.sent();
                        res.json(products);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * adds a new product
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof ProductController
     */
    ProductController.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var p, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        p = {
                            name: req.body.name,
                            price: req.body.price,
                            category_id: req.body.category
                        };
                        return [4 /*yield*/, ProductController.store.create(p)];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, res.json(product)];
                }
            });
        });
    };
    /**
     * shows products by category
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof ProductController
     */
    ProductController.prototype.showProductsByCategory = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var category, products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        category = req.params.category;
                        return [4 /*yield*/, ProductController.store.showProductsByCategory(category)];
                    case 1:
                        products = _a.sent();
                        res.json(products);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * deletes product by id
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof ProductController
     */
    ProductController.prototype["delete"] = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.body.id;
                        return [4 /*yield*/, ProductController.store["delete"](id)];
                    case 1:
                        product = _a.sent();
                        res.json(product);
                        return [2 /*return*/];
                }
            });
        });
    };
    ProductController.store = new product_1.ProductStore();
    ProductController.dashboard = new dashboard_1.DashboardQueries();
    return ProductController;
}());
exports.ProductController = ProductController;
