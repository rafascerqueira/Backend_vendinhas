import express from "express";
import {
  save,
  getUser,
  updateUser,
  deleteUser
} from "../controllers/userHandler";

const routes = express.Router();

// Register routes
routes.post("/signup", save);

routes.route("/users").all(getUser);

routes
  .route("/users/:id")
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default routes;
