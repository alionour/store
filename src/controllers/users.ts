import { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import { generateToken } from '../utils/create_token';
import { hashPassword } from '../utils/hash_password';

/**
 * A controller for users
 *
 * @export
 * @class UserController
 */
export class UserController {
  store = new UserStore();
  /**
     * gets all users handler
     *
     * @param {Request} _req
     * @param {Response} res
     */
  async index(req: Request, res: Response) {

    try {
      const users = await this.store.index();
      return res.json(users);
    } catch (error) {
      res.status(400);
      res.json(error);
      return;
    }

  }

  /**
   * shows one user by id
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof UserController
   */
  async show(req: Request, res: Response) {
    try {
      const id: string = req.params.id;
      const user = await this.store.show(id);
      res.json(user);
    } catch (error) {
      res.status(400);
      res.json(error);
      return;
    }

  }

  /**
   * adds a new user
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof UserController
   */
  async create(req: Request, res: Response) {
    const password = req.body.password;
    const hashedPassword = hashPassword(password);
    const u: User = {
      firstname: req.body.firstname,
      lastname: req.body.password,
      password: hashedPassword,
      email: req.body.email,
    };

    try {
      const newUser = await this.store.create(u);
      const token = generateToken({ user: newUser });
      return res.json(token);
    } catch (error) {
      res.status(400);
      res.json(error);
      return;
    }

  }
}
