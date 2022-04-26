import { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';


/**
 * A controller for products
 *
 * @export
 * @class ProductController
 */
export class ProductController {
    store = new ProductStore();
    /**
       * gets all products handler
       *
       * @param {Request} _req
       * @param {Response} res
       */
    async index(_req: Request, res: Response) {
        const products = await this.store.index();
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
        const id: string = req.params.id;
        const product = await this.store.show(id);
        res.json(product);
    }

    async showTopProducts(req: Request, res: Response) {
        const limit: number = (req.params.limit as unknown) as number;
        const products = await this.store.topProducts(limit);
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
            category: req.body.category,
        };
        const product = await this.store.create(p);
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
        const category: string = req.params.category;
        const products = await this.store.showProductsByCategory(category);
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
        const id: string = req.params.id;
        const product = await this.store.delete(id);
        res.json(product);
    }
}
