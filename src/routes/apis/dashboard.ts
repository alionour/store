import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { DashboardQueries } from '../../services/dashboard';

const controller = new DashboardQueries();
// eslint-disable-next-line new-cap
const dashboard = Router();


dashboard.get("/productsInOrders", auth, controller.productsInOrders);
dashboard.get("/usersWithOrders", auth, controller.usersWithOrders);
dashboard.get("/topProducts", auth, controller.topProducts);
export default dashboard;
