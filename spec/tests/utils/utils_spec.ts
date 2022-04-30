import { compareHash } from '../../../src/utils/compare_hash';
import { generateToken } from '../../../src/utils/create_token';
import { hashPassword } from '../../../src/utils/hash_password';
import { verifyToken } from '../../../src/utils/verify_token';

describe('Utils', () => {
    describe('Definitions', () => {
        it('should have a compareHash function', () => {
            expect(compareHash).toBeDefined();
        });

        it('should have a hashPassword function', () => {
            expect(hashPassword).toBeDefined();
        });

        it('should have a generateToken function', () => {
            expect(generateToken).toBeDefined();
        });

        it('should have a verifyToken function', () => {
            expect(verifyToken).toBeDefined();
        });
    });

    describe('Functionality', () => {
        it('should behave...Compare the provided password with the stored hash', () => {
            const password = 'password';
            const hash = hashPassword(password);
            const result = compareHash(password, hash);

            expect(result).toBe(true);
        });

        it('should behave...hash the provided password', () => {
            const password = 'password';
            const hash = hashPassword(password);

            expect(hash).toBeDefined();
        });

        it('should behave...generate token from the provide payload', () => {
            const payload = {
                id: 1,
                email: '1@gmail.com',
                firstname: 'John',
                lastname: 'Doe',

            };
            const token = generateToken(payload);

            expect(token).toBeDefined();
        });

        it('should behave...verify token ', () => {
            const payload = {
                id: 1,
                email: '1@gmail.com',
                firstname: 'John',
                lastname: 'Doe',

            };
            const token = generateToken(payload);
            const result = verifyToken(token);

            expect(result).toBe(true);
        });
    });
});



