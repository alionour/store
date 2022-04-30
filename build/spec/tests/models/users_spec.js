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
const user_1 = require("../../../src/models/user");
const verify_token_1 = require("../../../src/utils/verify_token");
const store = new user_1.UserStore();
describe('User Model', () => {
    describe('Model Definitions', () => {
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
        it('should behave... Have a login method', () => {
            expect(store.login).toBeDefined();
        });
        it('should behave... Have a signup method', () => {
            expect(store.signUp).toBeDefined();
        });
    });
    const u = {
        id: 2,
        email: "1@gmail.com",
        firstname: "Ali",
        lastname: "Nour",
        password: "123456789"
    };
    describe('Model Queries', () => {
        it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.create(u);
            expect(result.email).toEqual(u.email);
        }));
        it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.index();
            expect(result[0].email).toEqual(u.email);
        }));
        it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.show(u.id);
            expect(result.email).toEqual(u.email);
        }));
        it('login method should return the user token', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.login(u.email, u.password);
            expect((0, verify_token_1.verifyToken)(result)).toEqual(true);
        }));
        const u2 = {
            id: 3,
            email: "11@gmail.com",
            firstname: "Ali",
            lastname: "Nour",
            password: "123456789"
        };
        it('signup method should create a new user and returns a token', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield store.signUp(u2);
            expect((0, verify_token_1.verifyToken)(result)).toEqual(true);
        }));
        it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
            yield store.delete(u.id);
            yield store.delete(u2.id);
            const result = yield store.index();
            expect(result).toEqual([]);
        }));
    });
});
//# sourceMappingURL=users_spec.js.map