import { Router } from "express";
import { CategoryController } from "../../controllers/categories";

const controller = new CategoryController();
// eslint-disable-next-line new-cap
const categories = Router();

categories.get("/", controller.index);

categories.get("/:id", controller.show);

categories.post("/", controller.create);

categories.delete("/", controller.delete);

export default categories;
