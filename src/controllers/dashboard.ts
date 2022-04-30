import { Request, Response } from "express";
import { DashboardQueries } from '../services/dashboard';

/**
 * A controller for categories
 *
 * @export
 * @class CategoryController
 */
export class DashboardController {
    static store = new DashboardQueries();
    /**
     * gets all users with orders
     *
     * @param {Request} _req
     * @param {Response} res
     */
    async usersWithOrders(_req: Request, res: Response) {
        const users = await DashboardController.store.usersWithOrders();
        res.json(users);
        res.status(200);
    }

    /**
     * Get all products that have been included in orders
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof CategoryController
     */
    async productsInOrders(req: Request, res: Response) {
        const products = await DashboardController.store.productsInOrders();
        res.json(products);
        res.status(200);
    }

    /**
     * Gets all top products
     *
     * @param {Request} req
     * @param {Response} res
     * @memberof CategoryController
     */
    async topProducts(req: Request, res: Response) {

        const products = await DashboardController.store.topProducts(5);
        res.status(201);
        return res.json(products);
    }


}
