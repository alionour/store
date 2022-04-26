import Client from '../config/database';

export type Product = {
    id?: number;
    name: string;
    price: number;
    category: string
}

/**
 * class used to query products from the store
 *
 * @export
 * @class ProductStore
 */
export class ProductStore {
    /**
     * gets all products from the store
     *
     * @return {*}  {Promise<Array<Product>>}
     * @memberof ProductStore
     */
    async index(): Promise<Array<Product>> {
        try {
            const conn = await Client.connect();
            const sql = 'SLECT * FROM products';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`cannot get products ${error}`);
        }
    }


    /**
     * gets one product by id from the store
     *
     * @param {string} id
     * @return {*}  {Promise<Product>}
     * @memberof ProductStore
     */
    async show(id: string): Promise<Product> {
        try {
            const sql = 'SELECT * FROM products WHERE id=($1)';

            const conn = await Client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }

    /**
     * creates a new product in the store
     *
     * @param {Product} p
     * @return {*}  {Promise<Product>}
     * @memberof ProductStore
     */
    async create(p: Product): Promise<Product> {
        try {
            const sql = `INSERT INTO products (name, price,category)
       VALUES($1, $2, $3) RETURNING *`;
            // @ts-ignore
            const conn = await Client.connect();

            const result = await conn
                .query(sql, [p.name, p.price, p.category]);

            const product = result.rows[0];

            conn.release();

            return product;
        } catch (err) {
            throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
        }
    }

    /**
     * deletes a product from the store
     *
     * @param {string} id
     * @return {*}  {Promise<Product>}
     * @memberof ProductStore
     */
    async delete(id: string): Promise<Product> {
        try {
            const sql = 'DELETE FROM products WHERE id=($1)';
            // @ts-ignore
            const conn = await Client.connect();

            const result = await conn.query(sql, [id]);

            const product = result.rows[0];

            conn.release();

            return product;
        } catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }


    /**
     * gets products by category
     *
     * @param {string} category
     * @return {*}  {Promise<Array<Product>>}
     * @memberof ProductStore
     */
    async showProductsByCategory(category: string): Promise<Array<Product>> {
        try {
            const sql = 'SELECT * FROM products WHERE category=($1)';

            const conn = await Client.connect();

            const result = await conn.query(sql, [category]);

            conn.release();

            return result.rows;
        } catch (err) {
            throw new Error(`Could not find products ${category}. Error: ${err}`);
        }
    }

    /**
   * gets the top popular products
   *
   * @return {*}  {Promise<Array<Product>>}
   * @memberof OrderStore
   */
    async topProducts(limit: number): Promise<Array<Product>> {
        const conn = await Client.connect();
        const sql = `SELECT COUNT(*) ,products.* FROM
        orders JOIN products ON orders.product_id = products.id
        JOIN categories on products.category_id = categories.id 
        GROUP BY products.id ORDER BY COUNT(*) DESC LIMIT ${limit};`;
        const result = await conn.query(sql,);
        conn.release();
        return result.rows;
    }
}
