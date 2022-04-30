"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../../../src/models/product");
const store = new product_1.ProductStore();
describe('Product Model', () => {
    it('should behave... Have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should behave... Have a create method', () => {
        expect(store.create).toBeDefined();
    });
    it('should behave... Have a show method', () => {
        expect(store.show).toBeDefined();
    });
    it('should behave... Have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
});
//# sourceMappingURL=products.js.map