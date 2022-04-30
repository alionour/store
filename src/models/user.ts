import dbClient from "../config/database";
import { compareHash } from "../utils/compare_hash";
import { generateToken } from "../utils/create_token";
import { hashPassword } from "../utils/hash_password";

export type User = {
  id?: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
};

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
      const conn = await dbClient.connect();
      const sql = "SELECT * FROM users";
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
   * @param {number} id
   * @return {*}  {Promise<User>}
   * @memberof UserStore
   */
  async show(id: number): Promise<User> {
    try {
      const sql = "SELECT * FROM users WHERE id=($1)";

      const conn = await dbClient.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
  /**
   * login the user
   *
   * @param {string} email
   * @param {string} password
   * @return {*}  {Promise<boolean>}
   * @memberof UserStore
   */
  async login(email: string, password: string): Promise<string> {
    try {
      const sql = "SELECT * FROM users WHERE email =($1);";
      const conn = await dbClient.connect();
      const result = await conn.query(sql, [email]);
      conn.release();

      if (result.rowCount > 0) {
        const user: User = result.rows[0];
        const isValid = compareHash(password, user.password);

        if (isValid) {
          const token: string = generateToken(user);
          return token;
        } else {
          /// password is invalid
          throw new Error("username or password is invalid");
        }
      } else {
        /// email is invalid
        throw new Error("username or password is invalid");
      }
    } catch (error) {
      throw new Error(`username or password is invalid ${error}`);
    }
  }

  /**
   * creates a new user in the store
   *
   * @param {User} u
   * @return {*}  {Promise<User>}
   * @memberof UserStore
   */
  async signUp(u: User): Promise<string> {
    try {
      const sql = `INSERT INTO users (firstname, email,lastname,password)
       VALUES($1, $2, $3,$4) RETURNING *`;
      // @ts-ignore
      const conn = await dbClient.connect();

      const result = await conn.query(sql, [
        u.firstname,
        u.email,
        u.lastname,
        hashPassword(u.password),
      ]);

      const user = result.rows[0];

      conn.release();
      const token: string = generateToken(user);
      return token;
    } catch (err) {
      throw new Error(`Could not add new user ${u.firstname}.
       Error: ${err}`);
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
      const sql = `INSERT INTO users (firstname, email,lastname,password)
       VALUES($1, $2, $3,$4) RETURNING *`;
      // @ts-ignore
      const conn = await dbClient.connect();

      const result = await conn.query(sql, [
        u.firstname,
        u.email,
        u.lastname,
        hashPassword(u.password),
      ]);

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
   * @param {number} id
   * @return {*}  {Promise<User>}
   * @memberof UserStore
   */
  async delete(id: number): Promise<User> {
    try {
      const sql = "DELETE FROM users WHERE id=($1)";
      // @ts-ignore
      const conn = await dbClient.connect();

      const result = await conn.query(sql, [id]);

      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }
}
