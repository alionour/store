import { Router } from 'express';
import { ProductController } from '../../controllers/products';
import { authenticateToken } from '../../middlewares/authenticate_token';

const controller = new ProductController();
// eslint-disable-next-line new-cap
const products = Router();

products.get('/', controller.index);

products.get('/top5/:limit=5', controller.showTopProducts);

products.get('/:id', controller.show);

products.get('/category/:category', controller.showProductsByCategory);

products.post('/', authenticateToken, controller.create);

products.delete('/', authenticateToken, controller.delete);


export default products;
