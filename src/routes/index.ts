import * as express from 'express';
import orders from './apis/orders';
import products from './apis/products';
import users from './apis/users';


// eslint-disable-next-line new-cap
const router = express.Router();
router.use('/api/products', products);
router.use('/api/users', users);
router.use('/api/orders', orders);

export default router;
