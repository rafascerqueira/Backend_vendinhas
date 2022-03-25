import { Request, Response, Router } from "express";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.get("/", (_: Request, response: Response) => {
  return response.json({ message: "Hello!" });
});

routes.use("/users", usersRoutes);

export { routes };
