import { Router } from "express";
import { ProductController } from "../../controllers/products";
import { auth } from "../../middlewares/auth";

const controller = new ProductController();
// eslint-disable-next-line new-cap
const products = Router();

products.get("/", controller.index);

products.get("/top/:limit", controller.showTopProducts);

products.get("/:id", controller.show);

products.get("/category/:category_id", controller.showProductsByCategory);

products.post("/", auth, controller.create);

products.delete("/", auth, controller.delete);

export default products;
