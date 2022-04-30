import { Category, CategoryStore } from '../../../src/models/category';
import { Order, OrderStore } from '../../../src/models/order';
import { Product, ProductStore } from '../../../src/models/product';
import { User, UserStore } from '../../../src/models/user';

const userStore = new UserStore();
const productStore = new ProductStore();
const orderStore = new OrderStore();
const categoryStore = new CategoryStore();

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

        const u: User = {
            id: 1,
            email: "1@gmail.com",
            firstname: "Ali",
            lastname: "Nour",
            password: "123456789"

        };
        const p: Product = {
            id: 1,
            name: 'Iphone2',
            price: 500,
            category_id: 2
        };
        const c: Category = {
            id: 1,
            category: "Mobiles"
        };
        const o: Order = {
            id: 1,
            user_id: u.id!,
            product_id: p.id!,
            quantity: 2,
            status: "complete"
        }
        beforeAll(async () => {
            await categoryStore.create(c);
            await productStore.create(p);
            await userStore.create(u);
        });

        afterAll(async () => {
            await productStore.delete(p.id!);
            await categoryStore.delete(c.id!);
            await userStore.delete(u.id!);
        });

        it('create method should add a order', async () => {
            const result = await orderStore.create(o);

            expect(result).toEqual(o);
        });

        it('index method should return a list of orders', async () => {
            const result = await orderStore.index();

            expect(result).toEqual([o]);
        });

        it('show method should return the correct order', async () => {
            const result = await orderStore.show(1);

            expect(result).toEqual(o);
        });

        it('delete method should remove the order', async () => {
            await orderStore.delete(1);
            const result = await orderStore.index()

            expect(result).toEqual([]);
        });
    });




});