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
const store = new category_1.CategoryStore();
describe('Category Model', () => {
    describe('Model Definitions', () => {
        it('should Have ... index method', () => {
            expect(store.index).toBeDefined();
        });
        it('should Have ... create method', () => {
            expect(store.create).toBeDefined();
        });
        it('should Have ... show method', () => {
            expect(store.show).toBeDefined();
        });
        it('should Have ... delete method', () => {
            expect(store.delete).toBeDefined();
        });
    });
    describe('Models Queries', () => {
        const c = {
            id: 1,
            category: 'Food'
        };
        it('1.1 create method should add a category', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.create(c);
            expect(result).toEqual(c);
        }));
        it('1.2 index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result).toEqual([c]);
        }));
        it('1.3 show method should return the correct category', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.show(1);
            expect(result).toEqual(c);
        }));
        it('1.4 delete method should remove the category', () => __awaiter(void 0, void 0, void 0, function* () {
            yield store.delete(1);
            const result = yield store.index();
            expect(result).toEqual([]);
        }));
    });
});
//# sourceMappingURL=categories_spec.js.map