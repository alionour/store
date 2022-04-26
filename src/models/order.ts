import Client from '../config/database';
import { Product } from './product';

export type Order = {
    // id: number;
    product_id: number;
    user_id: number;
    quantity: number;
    status: string;
}

/**
 * class used to query orders from the store
 *
 * @export
 * @class OrderStore
 */
export class OrderStore {
    /**
     * gets all orders from the store
     *
     * @return {*}  {Promise<Array<Order>>}
     * @memberof OrderStore
     */
    async index(): Promise<Array<Order>> {
        try {
            const conn = await Client.connect();
            const sql = 'SLECT * FROM orders';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch (error) {
            throw new Error(`cannot get orders ${error}`);
        }
    }


    /**
     * gets one order by id from the store
     *
     * @param {string} id
     * @return {*}  {Promise<Order>}
     * @memberof OrderStore
     */
    async show(id: string): Promise<Order> {
        try {
            const sql = 'SELECT * FROM orders WHERE id=($1)';

            const conn = await Client.connect();

            const result = await conn.query(sql, [id]);

            conn.release();

            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find order ${id}. Error: ${err}`);
        }
    }

    /**
     * creates a new order in the store
     *
     * @param {Order} o
     * @return {*}  {Promise<Order>}
     * @memberof OrderStore
     */
    async create(o: Order): Promise<Order> {
        try {
            const sql = `INSERT INTO orders (product_id,quantity, user_id,status)
       VALUES($1, $2, $3,$4) RETURNING *`;
            // @ts-ignore
            const conn = await Client.connect();

            const result = await conn
                .query(sql, [o.product_id, o.quantity, o.user_id, o.status]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not add new order ${o.product_id}. Error: ${err}`);
        }
    }

    /**
     * deletes a order from the store
     *
     * @param {string} id
     * @return {*}  {Promise<Order>}
     * @memberof OrderStore
     */
    async delete(id: string): Promise<Order> {
        try {
            const sql = 'DELETE FROM orders WHERE id=($1)';
            // @ts-ignore
            const conn = await Client.connect();

            const result = await conn.query(sql, [id]);

            const order = result.rows[0];

            conn.release();

            return order;
        } catch (err) {
            throw new Error(`Could not delete order ${id}. Error: ${err}`);
        }
    }


    /**
     * shows all orders related to userId
     *
     * @param {number} userId
     * @return {*}  {Promise<Array<Product>>}
     * @memberof OrderStore
     */
    async showOrdersByUserId(userId: number): Promise<Array<Product>> {
        const conn = await Client.connect();
        const sql = 'SELECT * FROM orders WHERE user_id= ($1)';
        const result = await conn.query(sql, [userId]);
        conn.release();
        return result.rows;
    }

    /**
     * shows all completed orders related to userId
     *
     * @param {number} userId
     * @return {*}  {Promise<Array<Product>>}
     * @memberof OrderStore
     */
    async showCompletedOrdersByUserId(userId: number): Promise<Array<Product>> {
        const conn = await Client.connect();
        const sql = `SELECT * FROM orders WHERE
     user_id = ($1) and status = 'complete'`;
        const result = await conn.query(sql, [userId]);
        conn.release();
        return result.rows;
    }

    /**
     * shows all active orders related to userId
     *
     * @param {number} userId
     * @return {*}  {Promise<Array<Product>>}
     * @memberof OrderStore
     */
    async showActiveOrdersByUserId(userId: number): Promise<Array<Product>> {
        const conn = await Client.connect();
        const sql = `SELECT * FROM orders WHERE
         user_id = ($1) and status = 'active'; `;
        const result = await conn.query(sql, [userId]);
        conn.release();
        return result.rows;
    }


}
