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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const category_1 = require("../../../src/models/category");
const product_1 = require("../../../src/models/product");
const productStore = new product_1.ProductStore();
const categoryStore = new category_1.CategoryStore();
describe('Product Model', () => {
    describe('Model Definitions', () => {
        it('should behave... Have an index method', () => {
            expect(categoryStore.index).toBeDefined();
        });
        it('should behave... Have a create method', () => {
            expect(categoryStore.create).toBeDefined();
        });
        it('should behave... Have a show method', () => {
            expect(categoryStore.show).toBeDefined();
        });
        it('should behave... Have a delete method', () => {
            expect(categoryStore.delete).toBeDefined();
        });
    });
    describe('Model Queries', () => {
        let c = {
            id: 2,
            category: "Mobiles"
        };
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            c = yield categoryStore.create(c);
        }));
        const p = {
            id: 2,
            name: 'Iphone',
            price: 500,
            category_id: c.id
        };
        // below line is important because pg-node returns numeric as string
        pg_1.default.types.setTypeParser(pg_1.default.types.builtins.NUMERIC, (value) => {
            return parseFloat(value);
        });
        it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield productStore.create(p);
            expect(result.name).toEqual(p.name);
        }));
        it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield productStore.index();
            expect(result).toEqual([p]);
        }));
        it('show method should return the correct product', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield productStore.show(p.id);
            expect(result).toEqual(p);
        }));
        it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
            yield productStore.delete(p.id);
            const result = yield productStore.index();
            expect(result).toEqual([]);
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield categoryStore.delete(c.id);
        }));
    });
});
//# sourceMappingURL=products_spec.js.map