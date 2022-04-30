import { Router } from "express";
import { AuthenticationController } from "../../controllers/authentication";

const controller = new AuthenticationController();
// eslint-disable-next-line new-cap
const authentication = Router();

authentication.post("/login", controller.login);

authentication.post("/signup", controller.signup);

export default authentication;
