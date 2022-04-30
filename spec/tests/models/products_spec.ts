import pg from 'pg';
import { Category, CategoryStore } from '../../../src/models/category';
import { Product, ProductStore } from '../../../src/models/product';
const productStore = new ProductStore();
const categoryStore = new CategoryStore();

describe('Product Model', () => {
    describe('Model Definitions', () => {
        it('should behave... Have an index method', () => {
            expect(categoryStore.index).toBeDefined();
        });

        it('should behave... Have a create method', () => {
            expect(categoryStore.create).toBeDefined();
        });

        it('should behave... Have a show method', () => {
            expect(categoryStore.show).toBeDefined();
        });

        it('should behave... Have a delete method', () => {
            expect(categoryStore.delete).toBeDefined();
        });
    });



    describe('Model Queries', () => {

        let c: Category = {
            id: 2,
            category: "Mobiles"
        };


        beforeAll(async () => {
            c = await categoryStore.create(c);

        });
        const p: Product = {
            id: 2,
            name: 'Iphone',
            price: 500,
            category_id: c.id!
        };
        // below line is important because pg-node returns numeric as string
        pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value: string) => {
            return parseFloat(value);
        });


        it('create method should add a product', async () => {
            const result = await productStore.create(p);

            expect(result.name).toEqual(p.name);
        });

        it('index method should return a list of products', async () => {
            const result = await productStore.index();

            expect(result).toEqual([p]);
        });

        it('show method should return the correct product', async () => {
            const result = await productStore.show(p.id!);

            expect(result).toEqual(p);
        });

        it('delete method should remove the product', async () => {
            await productStore.delete(p.id!);
            const result = await productStore.index()

            expect(result).toEqual([]);
        });

        afterAll(async () => {
            await categoryStore.delete(c.id!);

        });
    });

});