import { CreateUserController } from "modules/users/controllers/CreateUserController";
import { Request, Response, Router } from "express";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.get("/", (_: Request, response: Response) =>
  response.json({ message: "users routes" })
);
usersRoutes.post("/signup", createUserController.handle);

export { usersRoutes };
