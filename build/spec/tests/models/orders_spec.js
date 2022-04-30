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
const category_1 = require("../../../src/models/category");
const order_1 = require("../../../src/models/order");
const product_1 = require("../../../src/models/product");
const user_1 = require("../../../src/models/user");
const userStore = new user_1.UserStore();
const productStore = new product_1.ProductStore();
const orderStore = new order_1.OrderStore();
const categoryStore = new category_1.CategoryStore();
describe('Order Model', () => {
    describe('Model Definitions', () => {
        it('should Have ... index method', () => {
            expect(orderStore.index).toBeDefined();
        });
        it('should Have ... create method', () => {
            expect(orderStore.create).toBeDefined();
        });
        it('should Have ... show method', () => {
            expect(orderStore.show).toBeDefined();
        });
        it('should Have ... delete method', () => {
            expect(orderStore.delete).toBeDefined();
        });
        it('should Have ... showActiveOrdersByUserId method', () => {
            expect(orderStore.showActiveOrdersByUserId).toBeDefined();
        });
        it('should Have ... showCompletedOrdersByUserId method', () => {
            expect(orderStore.showCompletedOrdersByUserId).toBeDefined();
        });
        it('should Have ... showOrdersByUserId method', () => {
            expect(orderStore.showOrdersByUserId).toBeDefined();
        });
    });
    describe('Model Queries', () => {
        const u = {
            id: 1,
            email: "1@gmail.com",
            firstname: "Ali",
            lastname: "Nour",
            password: "123456789"
        };
        const p = {
            id: 1,
            name: 'Iphone2',
            price: 500,
            category_id: 2
        };
        const c = {
            id: 1,
            category: "Mobiles"
        };
        const o = {
            id: 1,
            user_id: u.id,
            product_id: p.id,
            quantity: 2,
            status: "complete"
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield categoryStore.create(c);
            yield productStore.create(p);
            yield userStore.create(u);
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield productStore.delete(p.id);
            yield categoryStore.delete(c.id);
            yield userStore.delete(u.id);
        }));
        it('create method should add a order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderStore.create(o);
            expect(result).toEqual(o);
        }));
        it('index method should return a list of orders', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderStore.index();
            expect(result).toEqual([o]);
        }));
        it('show method should return the correct order', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield orderStore.show(1);
            expect(result).toEqual(o);
        }));
        it('delete method should remove the order', () => __awaiter(void 0, void 0, void 0, function* () {
            yield orderStore.delete(1);
            const result = yield orderStore.index();
            expect(result).toEqual([]);
        }));
    });
});
//# sourceMappingURL=orders_spec.js.map