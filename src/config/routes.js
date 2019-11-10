import express from "express";
import {
  save,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/userHandler";
import { store, index } from "../controllers/customerHandler";
import { signin, validateToken } from "./auth";
import passport from "./passport";

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

export default routes;
