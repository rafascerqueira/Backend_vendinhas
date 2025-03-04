import { type Request, type Response, Router } from "express";
import { customersRoutes } from "./customers.routes";
import { ordersRoutes } from "./orders.routes";
import { productsRoutes } from "./products.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.get("/", (_: Request, response: Response) => {
	return response.json({ message: "Hello!" });
});

routes.use("/users", usersRoutes);
routes.use("/customers", customersRoutes);
routes.use("/products", productsRoutes);
routes.use("/orders", ordersRoutes);

export { routes };
