import { Request, Response } from "express";
import { Product, ProductStore } from "../models/product";
import { DashboardQueries } from "../services/dashboard";

/**
 * A controller for products
 *
 * @export
 * @class ProductController
 */
export class ProductController {
  static store = new ProductStore();
  static dashboard = new DashboardQueries();
  /**
   * gets all products handler
   *
   * @param {Request} _req
   * @param {Response} res
   */
  async index(_req: Request, res: Response) {
    const products = await ProductController.store.index();
    res.json(products);
  }

  /**
   * shows one product by id
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  async show(req: Request, res: Response) {
    const id: number = Number.parseInt(req.params.id);

    const product = await ProductController.store.show(id);
    res.json(product);
  }

  /**
   * shows top proucts
   * requires limit
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  async showTopProducts(req: Request, res: Response) {
    let limit: number;
    if (!req.params.limit) {
      limit = 5;
    } else {
      limit = req.params.limit as unknown as number;
    }
    const products = await ProductController.dashboard.topProducts(limit);
    res.json(products);
  }

  /**
   * adds a new product
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  async create(req: Request, res: Response) {
    const p: Product = {
      name: req.body.name,
      price: req.body.price,
      category_id: req.body.category,
    };
    const product = await ProductController.store.create(p);
    res.status(201);
    return res.json(product);
  }

  /**
   * shows products by category
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  async showProductsByCategory(req: Request, res: Response) {
    const category_id: number = parseInt(req.params.category_id);
    const products = await ProductController.store.showProductsByCategory(
      category_id
    );
    res.json(products);
  }

  /**
   * deletes product by id
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  async delete(req: Request, res: Response) {
    const id: number = req.body.id;
    const product = await ProductController.store.delete(id);
    res.json(product);
  }
}
