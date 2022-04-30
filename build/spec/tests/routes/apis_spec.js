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
const supertest_1 = __importDefault(require("supertest"));
const database_1 = __importDefault(require("../../../src/config/database"));
const server_1 = __importDefault(require("../../../src/server"));
describe('API ROUTING TESTING', () => {
    describe('API Route', () => {
        it('GET /api', () => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, supertest_1.default)(server_1.default).get('/api').expect(200).expect('Content-Type', /json/);
        }));
        let token;
        let user = {
            email: 'alionour22@gmail.com',
            firstname: 'Ali',
            lastname: 'Nour',
            password: '123'
        };
        let user2;
        describe('Authentication Route', () => {
            it('POST /signup', () => __awaiter(void 0, void 0, void 0, function* () {
                const res = yield (0, supertest_1.default)(server_1.default).post('/signup').send({
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    password: user.password
                }).expect(201).expect('Content-Type', /json/);
                token = res.body;
            }));
            it('POST /login', () => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, supertest_1.default)(server_1.default).post('/login').send({
                    email: user.email,
                    password: user.password
                }).expect(200).expect('Content-Type', /json/);
            }));
        });
        describe('API ROUTES THAT REQUIRE TOKEN', () => {
            beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const sql = 'SELECT * FROM users WHERE email=($1)';
                    const conn = yield database_1.default.connect();
                    const result = yield conn.query(sql, [user.email]);
                    conn.release();
                    user = result.rows[0];
                    console.log(`id ${user.id}`);
                }
                catch (err) {
                    throw new Error(`Could not find user ${user.email}. Error: ${err}`);
                }
            }));
            describe('Users Route', () => {
                it('GET /api/users', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get('/api/users').set('Authorization', `Bearer ${token}`).expect(200).expect('Content-Type', /json/);
                }));
                it('POST /api/users', () => __awaiter(void 0, void 0, void 0, function* () {
                    const res = yield (0, supertest_1.default)(server_1.default).post('/api/users').send({
                        email: 'alionour33@gmail.com',
                        firstname: 'Ali',
                        lastname: 'Nour',
                        password: '123'
                    }).set('Authorization', `Bearer ${token}`).expect(201).expect('Content-Type', /json/);
                    user2 = res.body;
                }));
                it('Show /api/users', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get(`/api/users/${user2.id}`).set('Authorization', `Bearer ${token}`).expect(200).expect('Content-Type', /json/);
                }));
                it('DELETE /api/users', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).delete('/api/users').send({
                        id: user2.id,
                    }).set('Authorization', `Bearer ${token}`).expect(200);
                }));
            });
            describe('Categories Route', () => {
                it('GET /api/categories', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get('/api/categories/').expect(200).expect('Content-Type', /json/);
                }));
                it('POST /api/categories', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).post('/api/categories').send({
                        category: 'category 1',
                    }).expect(201).expect('Content-Type', /json/);
                }));
                it('Show /api/categories', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get('/api/categories/1').send({
                        category: 'category 1',
                    }).expect(200).expect('Content-Type', /json/);
                }));
                it('DELETE /api/categories', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).delete('/api/categories').send({
                        id: 1,
                    }).expect(200);
                }));
            });
            describe('Products Route', () => {
                it('GET /api/products', () => {
                    (0, supertest_1.default)(server_1.default).get('/api/products/').expect(200).expect('Content-Type', /json/);
                });
                it('POST /api/products', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).post('/api/products').send({
                        name: 'product 1',
                    }).set('Authorization', `Bearer ${token}`).expect(201).expect('Content-Type', /json/);
                }));
                it('Show /api/products', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get('/api/products/1').send({
                        name: 'product 1',
                    }).expect(200).expect('Content-Type', /json/);
                }));
                it('Show Top Products /api/products/top/5', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get('/api/products/top/5').expect(200).expect('Content-Type', /json/);
                }));
                it('Show Products By Category /api/products/category/1', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get('/api/products/category/1').expect(200).expect('Content-Type', /json/);
                }));
                it('DELETE /api/products', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).delete('/api/products').send({
                        id: 1,
                    }).set('Authorization', `Bearer ${token}`).expect(200);
                }));
            });
            describe('Orders Route', () => {
                it('GET /api/orders', () => {
                    (0, supertest_1.default)(server_1.default).get('/api/orders/').set('Authorization', `Bearer ${token}`).expect(200).expect('Content-Type', /json/);
                });
                it('POST /api/orders', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).post('/api/orders').send({
                        name: 'product 1',
                    }).set('Authorization', `Bearer ${token}`).expect(201).expect('Content-Type', /json/);
                }));
                it(`GET /api/orders/user/${user.id}`, () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get(`/api/orders/user/${user.id}`).set('Authorization', `Bearer ${token}`).expect(200).expect('Content-Type', /json/);
                }));
                it(`GET /api/orders/active/user/${user.id}`, () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get(`/api/orders/user/active/${user.id}`).set('Authorization', `Bearer ${token}`).expect(200).expect('Content-Type', /json/);
                }));
                it(`GET /api/orders/complete/user/${user.id}`, () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get(`/api/orders/user/complete/${user.id}`).set('Authorization', `Bearer ${token}`).expect(200).expect('Content-Type', /json/);
                }));
                it('Show /api/orders', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).get('/api/orders/1').set('Authorization', `Bearer ${token}`).expect(200).expect('Content-Type', /json/);
                }));
                it('DELETE /api/orders', () => __awaiter(void 0, void 0, void 0, function* () {
                    yield (0, supertest_1.default)(server_1.default).delete('/api/orders').send({
                        id: 1,
                    }).set('Authorization', `Bearer ${token}`).expect(200);
                }));
            });
        });
    });
});
//# sourceMappingURL=apis_spec.js.map