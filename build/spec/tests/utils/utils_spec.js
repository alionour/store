"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const compare_hash_1 = require("../../../src/utils/compare_hash");
const create_token_1 = require("../../../src/utils/create_token");
const hash_password_1 = require("../../../src/utils/hash_password");
const verify_token_1 = require("../../../src/utils/verify_token");
describe('Utils', () => {
    describe('Definitions', () => {
        it('should have a compareHash function', () => {
            expect(compare_hash_1.compareHash).toBeDefined();
        });
        it('should have a hashPassword function', () => {
            expect(hash_password_1.hashPassword).toBeDefined();
        });
        it('should have a generateToken function', () => {
            expect(create_token_1.generateToken).toBeDefined();
        });
        it('should have a verifyToken function', () => {
            expect(verify_token_1.verifyToken).toBeDefined();
        });
    });
    describe('Functionality', () => {
        it('should behave...Compare the provided password with the stored hash', () => {
            const password = 'password';
            const hash = (0, hash_password_1.hashPassword)(password);
            const result = (0, compare_hash_1.compareHash)(password, hash);
            expect(result).toBe(true);
        });
        it('should behave...hash the provided password', () => {
            const password = 'password';
            const hash = (0, hash_password_1.hashPassword)(password);
            expect(hash).toBeDefined();
        });
        it('should behave...generate token from the provide payload', () => {
            const payload = {
                id: 1,
                email: '1@gmail.com',
                firstname: 'John',
                lastname: 'Doe',
            };
            const token = (0, create_token_1.generateToken)(payload);
            expect(token).toBeDefined();
        });
        it('should behave...verify token ', () => {
            const payload = {
                id: 1,
                email: '1@gmail.com',
                firstname: 'John',
                lastname: 'Doe',
            };
            const token = (0, create_token_1.generateToken)(payload);
            const result = (0, verify_token_1.verifyToken)(token);
            expect(result).toBe(true);
        });
    });
});
//# sourceMappingURL=utils_spec.js.map