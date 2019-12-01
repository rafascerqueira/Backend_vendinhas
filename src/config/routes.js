import express from "express";
import {
  save,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/userHandler";
import { store, index } from "../controllers/customerHandler";
import {
  store as storeProd,
  index as getProd
} from "../controllers/productHandler";
import { shopStore, index as getShop } from "../controllers/shopHandler";
import { signin, validateToken } from "./auth";
import passport from "./passport";
// Tá uma bagunça, eu sei. Vou ver se arrumo isso com o Consign.
// I know that code are messy. I'll improve this with Consign in later.

const routes = express.Router();
const auth = passport();

routes.post("/signup", save);
routes.post("/signin", signin);
routes.post("/validate", validateToken);

routes
  .route("/users")
  .all(auth.authenticate())
  .get(getUser);

routes
  .route("/users/:id")
  .all(auth.authenticate())
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

routes
  .route("/customer")
  .all(auth.authenticate())
  .get(index)
  .post(store);

routes
  .route("/product")
  .all(auth.authenticate())
  .get(getProd)
  .post(storeProd);

routes
  .route("/shop/:id")
  .all(auth.authenticate())
  .get(getShop)
  .post(shopStore);

routes
  .route("/shop")
  .all(auth.authenticate())
  .get(getShop);

export default routes;
