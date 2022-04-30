import { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import { hashPassword } from "../utils/hash_password";

/**
 * A controller for users
 *
 * @export
 * @class UserController
 */
export class UserController {
  static store = new UserStore();
  /**
   * gets all users handler
   *
   * @param {Request} _req
   * @param {Response} res
   */
  async index(req: Request, res: Response) {
    try {
      const users = await UserController.store.index();
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
      const id: number = Number.parseInt(req.params.id);

      const user = await UserController.store.show(id);
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
      const newUser = await UserController.store.create(u);
      res.status(201);
      return res.json(newUser);
    } catch (error) {
      res.status(400);
      res.json(error);
      return;
    }
  }
  /**
   * deletes user by id
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  async delete(req: Request, res: Response) {
    const id: number = req.body.id;
    const user = await UserController.store.delete(id);
    res.json(user);
  }
}
