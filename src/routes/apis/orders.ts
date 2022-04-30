import { Router } from "express";
import { OrderController } from "../../controllers/orders";
import { auth } from "../../middlewares/auth";

const controller = new OrderController();
// eslint-disable-next-line new-cap
const orders = Router();

orders.get("/", auth, controller.index);

orders.get("/:id", auth, controller.show);

orders.get("/user/:userId", auth, controller.showOrdersByUserId);

orders.get(
  "/user/complete/:userId",
  auth,
  controller.showCompletedOrdersByUserId
);

orders.get("/user/active/:userId", auth, controller.showActiveOrdersByUserId);

orders.post("/", auth, controller.create);

orders.delete("/", auth, controller.delete);

export default orders;
