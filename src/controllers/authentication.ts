import { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import { generateToken } from "../utils/create_token";
export class AuthenticationController {
  static store = new UserStore();

  /**
   * login Handler
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthenticationController
   */
  async login(req: Request, res: Response) {
    try {
      const token = await AuthenticationController.store.login(
        req.body.email,
        req.body.password
      );
      res.json(token);
      res.status(200);
    } catch (error) {
      throw new Error(`can not login in ${error}`);
    }
  }

  /**
   * signup handler
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof AuthenticationController
   */
  async signup(req: Request, res: Response) {
    try {
      const u: User = {
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
      };
      const newUser = await AuthenticationController.store.signUp(u);
      const token = generateToken({ user: newUser });

      res.status(201);
      res.json(token);
    } catch (error) {
      throw new Error(`can not sign up in ${error}`);
    }
  }
}
