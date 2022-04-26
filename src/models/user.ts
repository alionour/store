import Client from '../config/database';

export type User = {
    id?: number;
    email:string;
    firstname: string;
    lastname: number;
    password: string;
}

/**
 * class used to query users from the store
 *
 * @export
 * @class UserStore
 */
export class UserStore {
  /**
   * gets all users from the store
   *
   * @return {*}  {Promise<Array<User>>}
   * @memberof UserStore
   */
  async index(): Promise<Array<User>> {
    try {
      const conn = await Client.connect();
      const sql = 'SLECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (error) {
      throw new Error(`cannot get users ${error}`);
    }
  }


  /**
   * gets one user by id from the store
   *
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof UserStore
   */
  async show(id: string): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';

      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }

  /**
   * creates a new user in the store
   *
   * @param {User} u
   * @return {*}  {Promise<User>}
   * @memberof UserStore
   */
  async create(u: User): Promise<User> {
    try {
      const sql = `INSERT INTO users (firstname, lastname,password)
       VALUES($1, $2, $3) RETURNING *`;
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn
          .query(sql, [u.firstname, u.lastname, u.password]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstname}.
       Error: ${err}`);
    }
  }

  /**
   * deletes a user from the store
   *
   * @param {string} id
   * @return {*}  {Promise<User>}
   * @memberof UserStore
   */
  async delete(id: string): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
