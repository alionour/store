import dbClient from "../config/database";

export type Category = {
  id?: number;
  category: string;
};

/**
 * class used to query categories from the store
 *
 * @export
 * @class CategoryStore
 */
export class CategoryStore {
  /**
   * gets all categories from the store
   *
   * @return {*}  {Promise<Array<Category>>}
   * @memberof CategoryStore
   */
  async index(): Promise<Array<Category>> {
    try {
      const conn = await dbClient.connect();
      const sql = "SELECT * FROM categories";
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get categories ${error}`);
    }
  }

  /**
   * gets one category by id from the store
   *
   * @param {number} id
   * @return {*}  {Promise<Category>}
   * @memberof CategoryStore
   */
  async show(id: number): Promise<Category> {
    try {
      const sql = "SELECT * FROM categories WHERE id=($1)";

      const conn = await dbClient.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find category ${id}. Error: ${err}`);
    }
  }

  /**
   * creates a new category in the store
   *
   * @param {Category} p
   * @return {*}  {Promise<Category>}
   * @memberof CategoryStore
   */
  async create(p: Category): Promise<Category> {
    try {
      const sql = `INSERT INTO categories (category)
            VALUES($1) RETURNING *`;
      // @ts-ignore
      const conn = await dbClient.connect();

      const result = await conn.query(sql, [p.category]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(
        `Could not add new category ${p.category}. Error: ${err}`
      );
    }
  }

  /**
   * deletes a category from the store
   *
   * @param {number} id
   * @return {*}  {Promise<Category>}
   * @memberof CategoryStore
   */
  async delete(id: number): Promise<Category> {
    try {
      const sql = "DELETE FROM categories WHERE id=($1) RETURNING *";
      // @ts-ignore
      const conn = await dbClient.connect();

      const result = await conn.query(sql, [id]);

      const category = result.rows[0];

      conn.release();

      return category;
    } catch (err) {
      throw new Error(`Could not delete category ${id}. Error: ${err}`);
    }
  }
}
