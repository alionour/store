import { Request, Response } from "express";
import { Category, CategoryStore } from "../models/category";

/**
 * A controller for categories
 *
 * @export
 * @class CategoryController
 */
export class CategoryController {
  static store = new CategoryStore();
  /**
   * gets all categories handler
   *
   * @param {Request} _req
   * @param {Response} res
   */
  async index(_req: Request, res: Response) {
    const categories = await CategoryController.store.index();
    res.json(categories);
    res.status(200);
  }

  /**
   * shows one category by id
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof CategoryController
   */
  async show(req: Request, res: Response) {
    const id: number = Number.parseInt(req.params.id);
    const category = await CategoryController.store.show(id);
    res.json(category);
    res.status(200);
  }

  /**
   * adds a new category
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof CategoryController
   */
  async create(req: Request, res: Response) {
    const p: Category = {
      category: req.body.category,
    };
    const category = await CategoryController.store.create(p);
    res.status(201);
    return res.json(category);
  }

  /**
   * deletes category by id
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof CategoryController
   */
  async delete(req: Request, res: Response) {
    const id: number = req.body.id;
    const category = await CategoryController.store.delete(id);
    res.json(category);
    return res.status(200);
  }
}
