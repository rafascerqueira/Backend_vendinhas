import { Request, Response, Router } from "express";
import { CreateUserController } from "modules/users/controllers/CreateUserController";
import { AuthenticateUserController } from "@modules/users/controllers/AuthenticateUserController";
import { ShowUserController } from "@modules/users/controllers/ShowUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const showUserController = new ShowUserController();

usersRoutes.get("/", (_: Request, response: Response) =>
  response.json({ message: "users routes" })
);

usersRoutes.post("/signup", createUserController.handle);
usersRoutes.post("/signin", authenticateUserController.handle);

usersRoutes.get("/:id", showUserController.handle);

export { usersRoutes };
