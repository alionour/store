"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../../src/server"));
const p = {
    name: 'product 1',
    price: 500,
    category_id: 1
};
describe('API ROUTING TESTING', () => {
    describe('API Route', () => {
        it('GET /api', () => {
            (0, supertest_1.default)(server_1.default).get('/api').expect(200).expect('Content-Type', /json/).end();
        });
        describe('Products Route', () => {
            it('GET /api/products', () => {
                (0, supertest_1.default)(server_1.default).get('/api/products/').expect(200).expect('Content-Type', /json/).end();
            });
            it('POST /api/products', () => {
                (0, supertest_1.default)(server_1.default).post('/api/products/').send(p).expect(200).expect('Content-Type', /json/).end();
            });
        });
    });
});
//# sourceMappingURL=apis.js.map