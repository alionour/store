import { User, UserStore } from '../../../src/models/user';
import { verifyToken } from '../../../src/utils/verify_token';

const store = new UserStore();
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

    const u: User = {
        id: 2,
        email: "1@gmail.com",
        firstname: "Ali",
        lastname: "Nour",
        password: "123456789"

    };

    describe('Model Queries', () => {
        it('create method should add a user', async () => {
            const result = await store.create(u);

            expect(result.email).toEqual(u.email);
        });

        it('index method should return a list of users', async () => {
            const result = await store.index();

            expect(result[0].email).toEqual(u.email,);
        });

        it('show method should return the correct user', async () => {
            const result = await store.show(u.id!);

            expect(result.email).toEqual(u.email);
        });

        it('login method should return the user token', async () => {
            const result = await store.login(
                u.email,
                u.password
            );

            expect(verifyToken(result)).toEqual(true);
        });
        const u2: User = {
            id: 3,
            email: "11@gmail.com",
            firstname: "Ali",
            lastname: "Nour",
            password: "123456789"

        };
        it('signup method should create a new user and returns a token', async () => {
            const result = await store.signUp(u2);

            expect(verifyToken(result)).toEqual(true);
        });

        it('delete method should remove the product', async () => {
            await store.delete(u.id!);
            await store.delete(u2.id!);
            const result = await store.index()

            expect(result).toEqual([]);
        });
    });


});