import dbClient from "../config/database";

export type Product = {
  id?: number;
  name: string;
  price: number;
  category_id: number;
};

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
      const conn = await dbClient.connect();
      const sql = "SELECT * FROM products";
      const result = await conn.query(sql);
      conn.release();
      return result.rows as Product[];
    } catch (error) {
      throw new Error(`cannot get products ${error}`);
    }
  }

  /**
   * gets one product by id from the store
   *
   * @param {number} id
   * @return {*}  {Promise<Product>}
   * @memberof ProductStore
   */
  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";

      const conn = await dbClient.connect();

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
      const sql = `INSERT INTO products (name, price,category_id)
       VALUES($1, $2, $3) RETURNING *`;
      // @ts-ignore
      const conn = await dbClient.connect();

      const result = await conn.query(sql, [p.name, p.price, p.category_id]);

      const product: Product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add new product ${p.name}. Error: ${err}`);
    }
  }

  /**
   * deletes a product from the store
   *
   * @param {number} id
   * @return {*}  {Promise<Product>}
   * @memberof ProductStore
   */
  async delete(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";
      // @ts-ignore
      const conn = await dbClient.connect();

      const result = await conn.query(sql, [id]);

      const product: Product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }

  /**
   * gets products by category
   *
   * @param {string} category_id
   * @return {*}  {Promise<Array<Product>>}
   * @memberof ProductStore
   */
  async showProductsByCategory(category_id: number): Promise<Array<Product>> {
    try {
      const sql = "SELECT * FROM products WHERE category_id =($1)";

      const conn = await dbClient.connect();

      const result = await conn.query(sql, [category_id]);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not find products ${category_id}. Error: ${err}`);
    }
  }
}
