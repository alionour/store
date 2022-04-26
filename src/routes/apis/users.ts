import { Router } from 'express';
import { UserController } from '../../controllers/users';
import { authenticateToken } from '../../middlewares/authenticate_token';

const controller = new UserController();
// eslint-disable-next-line new-cap
const users = Router();

users.get('/', authenticateToken, controller.index);

users.get('/:id', authenticateToken, controller.show);

users.post('/', authenticateToken, controller.create);

export default users;
