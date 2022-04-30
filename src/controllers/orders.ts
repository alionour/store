import { Request, Response } from "express";
import { Order, OrderStore } from "../models/order";

/**
 * A controller for orders
 *
 * @export
 * @class OrderController
 */
export class OrderController {
  static store = new OrderStore();
  /**
   * gets all ordders handler
   *
   * @param {Request} _req
   * @param {Response} res
   */
  async index(_req: Request, res: Response) {
    const orders = await OrderController.store.index();
    res.json(orders);
  }

  /**
   * shows one order by id
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof OrderController
   */
  async show(req: Request, res: Response) {
    const id: number = Number.parseInt(req.params.id);

    const order = await OrderController.store.show(id);
    res.json(order);
  }

  /**
   * adds a new order
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof OrderController
   */
  async create(req: Request, res: Response) {
    const o: Order = {
      status: req.body.status,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
    };
    const order = await OrderController.store.create(o);
    res.status(201);
    return res.json(order);
  }
  /**
   * shows all orders handler
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}
   * @memberof OrderController
   */
  async showOrdersByUserId(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);

    const orders = await OrderController.store.showOrdersByUserId(userId);
    return res.json(orders);
  }

  /**
   * shows all completed orders handler
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}
   * @memberof OrderController
   */
  async showCompletedOrdersByUserId(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);

    const orders = await OrderController.store.showCompletedOrdersByUserId(
      userId
    );
    return res.json(orders);
  }

  /**
   * shows all active orders handler
   *
   * @param {Request} req
   * @param {Response} res
   * @return {*}
   * @memberof OrderController
   */
  async showActiveOrdersByUserId(req: Request, res: Response) {
    const userId = parseInt(req.params.userId);
    const orders = await OrderController.store.showActiveOrdersByUserId(userId);
    return res.json(orders);
  }

  /**
   * deletes order by id
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof ProductController
   */
  async delete(req: Request, res: Response) {
    const id: number = req.body.id;
    const user = await OrderController.store.delete(id);
    res.json(user);
  }
}
