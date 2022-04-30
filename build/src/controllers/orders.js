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
exports.OrderController = void 0;
const order_1 = require("../models/order");
/**
 * A controller for orders
 *
 * @export
 * @class OrderController
 */
class OrderController {
    /**
       * gets all ordders handler
       *
       * @param {Request} _req
       * @param {Response} res
       */
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const orders = yield OrderController.store.index();
            res.json(orders);
        });
    }
    /**
     * shows one order by id
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof OrderController
     */
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number.parseInt(req.params.id);
            const order = yield OrderController.store.show(id);
            res.json(order);
        });
    }
    /**
     * adds a new order
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof OrderController
     */
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const o = {
                status: req.body.status,
                product_id: req.body.product_id,
                quantity: req.body.quantity,
                user_id: req.body.user_id,
            };
            const order = yield OrderController.store.create(o);
            res.status(201);
            return res.json(order);
        });
    }
    /**
     * shows all orders handler
     *
     * @param {Request} req
     * @param {Response} res
     * @return {*}
     * @memberof OrderController
     */
    showOrdersByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const orders = yield OrderController.store.showOrdersByUserId(userId);
            return res.json(orders);
        });
    }
    /**
     * shows all completed orders handler
     *
     * @param {Request} req
     * @param {Response} res
     * @return {*}
     * @memberof OrderController
     */
    showCompletedOrdersByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const orders = yield OrderController.store.showCompletedOrdersByUserId(userId);
            return res.json(orders);
        });
    }
    /**
     * shows all active orders handler
     *
     * @param {Request} req
     * @param {Response} res
     * @return {*}
     * @memberof OrderController
     */
    showActiveOrdersByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const orders = yield OrderController.store.showActiveOrdersByUserId(userId);
            return res.json(orders);
        });
    }
    /**
* deletes order by id
*
* @param {Request} req
* @param {Response} res
* @memberof ProductController
*/
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const user = yield OrderController.store.delete(id);
            res.json(user);
        });
    }
}
exports.OrderController = OrderController;
OrderController.store = new order_1.OrderStore();
//# sourceMappingURL=orders.js.map