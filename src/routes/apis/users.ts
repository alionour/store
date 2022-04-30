import { Router } from "express";
import { UserController } from "../../controllers/users";
import { auth } from "../../middlewares/auth";

const controller = new UserController();
// eslint-disable-next-line new-cap
const users = Router();

users.get("/", auth, controller.index);

users.get("/:id", auth, controller.show);

users.post("/", auth, controller.create);

users.delete("/", auth, controller.delete);


export default users;
