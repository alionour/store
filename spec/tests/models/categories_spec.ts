import { Category, CategoryStore } from '../../../src/models/category';

const store = new CategoryStore();
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
        const c: Category = {
            id: 1,
            category: 'Food'
        };
        it('1.1 create method should add a category', async () => {
            const result = await store.create(c);

            expect(result).toEqual(c);
        });

        it('1.2 index method should return a list of products', async () => {
            const result = await store.index();

            expect(result).toEqual([c]);
        });

        it('1.3 show method should return the correct category', async () => {
            const result = await store.show(1);

            expect(result).toEqual(c);
        });

        it('1.4 delete method should remove the category', async () => {
            await store.delete(1);
            const result = await store.index()

            expect(result).toEqual([]);
        });
    });

});