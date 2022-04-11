import { Request, Response, Router } from "express";
import { customersRoutes } from "./customers.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.get("/", (_: Request, response: Response) => {
  return response.json({ message: "Hello!" });
});

routes.use("/users", usersRoutes);
routes.use("/customers", customersRoutes);

export { routes };
