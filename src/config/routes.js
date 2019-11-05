import express from "express";
import {
  save,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/userHandler";
import { signin, validateToken } from "./auth";

const routes = express.Router();

// Register routes
routes.post("/signup", save);
routes.post("/signin", signin);
routes.post("/validate", validateToken);

routes.route("/users").all(getUser);

routes
  .route("/users/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default routes;
