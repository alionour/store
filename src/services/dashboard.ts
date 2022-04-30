import dbClient from "../config/database";
import { Product } from "../models/product";

/**
 * A service file is a place to write extra business logic
 * that does not belong in a handler or a model or orchestrates
 * changes with multiple models.
 *
 * @export
 * @class DashboardQueries
 */
export class DashboardQueries {
  /**
   * Get all users that have made orders
   *
   * @return {*}  {Promise<{firstName: string, lastName: string}[]>}
   * @memberof DashboardQueries
   */
  async usersWithOrders(): Promise<{ firstName: string; lastName: string }[]> {
    try {
      const conn = await dbClient.connect();
      const sql =
        "SELECT first_name, last_name FROM users INNER JOIN orders ON users.id = orders.user_id;";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }

  /**
   * Get all products that have been included in orders
   *
   * @return {*}  {Promise<{name: string, price: number, order_id: string}[]>}
   * @memberof DashboardQueries
   */
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      const conn = await dbClient.connect();
      const sql = `SELECT products.name, products.price, orders.id FROM products
       INNER JOIN orders ON producta.id = orders.product_id ;`;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  /**
   * gets the top popular products
   *
   * @return {*}  {Promise<Array<Product>>}
   * @memberof OrderStore
   */
  async topProducts(limit: number): Promise<Array<Product>> {
    const conn = await dbClient.connect();
    const sql = `SELECT products.* FROM
            orders JOIN products ON orders.product_id = products.id
            JOIN categories on products.category_id = categories.id 
            GROUP BY products.id ORDER BY COUNT(*) DESC LIMIT ${limit};`;
    const result = await conn.query(sql);
    conn.release();
    return result.rows;
  }
}
