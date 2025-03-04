import { type Request, type Response, Router } from "express";
import { CreateUserController } from "domain/application/modules/users/controllers/CreateUserController";
import { AuthenticateUserController } from "domain/application/modules/users/controllers/AuthenticateUserController";
import { ShowUserController } from "domain/application/modules/users/controllers/ShowUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const showUserController = new ShowUserController();

usersRoutes.get("/", (_: Request, response: Response) =>
	response.json({ message: "users routes" }),
);

usersRoutes.post("/signup", createUserController.handle);
usersRoutes.post("/signin", authenticateUserController.handle);

usersRoutes.get("/:id", showUserController.handle);

export { usersRoutes };
