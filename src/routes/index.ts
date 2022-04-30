import * as express from "express";
import authentication from "./apis/authentication";
import categories from "./apis/categories";
import orders from "./apis/orders";
import products from "./apis/products";
import users from "./apis/users";

// eslint-disable-next-line new-cap
const router = express.Router();
router.use(authentication);

router.get("/api", (_req, res) => {
  res.json("API");
});
router.use("/api/products", products);
router.use("/api/categories", categories);
router.use("/api/users", users);
router.use("/api/orders", orders);

export default router;
