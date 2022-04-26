import { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';


/**
 * A controller for orders
 *
 * @export
 * @class OrderController
 */
export class OrderController {
  store =new OrderStore();
  /**
     * gets all ordders handler
     *
     * @param {Request} _req
     * @param {Response} res
     */
  async index(_req:Request, res:Response) {
    const orders = await this.store.index();
    res.json(orders);
  }

  /**
   * shows one order by id
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof OrderController
   */
  async show(req:Request, res:Response) {
    const id:string = req.params.id;
    const order = await this.store.show(id);
    res.json(order);
  }

  /**
   * adds a new order
   *
   * @param {Request} req
   * @param {Response} res
   * @memberof OrderController
   */
  async create(req:Request, res:Response) {
    const o:Order ={
      status: req.body.status,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      user_id: req.body.user_id,
    };
    const order = await this.store.create(o);
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
  async showOrdersByUserId(req:Request, res:Response) {
    const userId = (req.params.userId as unknown) as number;
    const orders = await this.store.showOrdersByUserId(userId);
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
  async showCompletedOrdersByUserId(req:Request, res:Response) {
    const userId = (req.params.userId as unknown) as number;
    const orders = await this.store.showCompletedOrdersByUserId(userId);
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
  async showActiveOrdersByUserId(req:Request, res:Response) {
    const userId = (req.params.userId as unknown) as number;
    const orders = await this.store.showActiveOrdersByUserId(userId);
    return res.json(orders);
  }
}
