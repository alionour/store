import { Router } from 'express';
import { OrderController } from '../../controllers/orders';
import { authenticateToken } from '../../middlewares/authenticate_token';

const controller = new OrderController();
// eslint-disable-next-line new-cap
const orders = Router();

orders.get('/', authenticateToken, controller.index);

orders.get('/:id', authenticateToken, controller.show);

orders.get('/user/:userId', authenticateToken, controller.showOrdersByUserId);

orders.get('/user/complete/:userId', authenticateToken, controller.showCompletedOrdersByUserId);

orders.get('/user/active/:userId', authenticateToken, controller.showActiveOrdersByUserId);

orders.post('/', authenticateToken, controller.create);


export default orders;
