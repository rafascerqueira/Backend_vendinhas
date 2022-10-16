import { CreateOrderController } from "@modules/orders/controllers/CreateOrderController";
import { DeleteOrderController } from "@modules/orders/controllers/DeleteOrderController";
import { GetAllOrdersController } from "@modules/orders/controllers/GetAllOrdersController";
import { GetOneOrderController } from "@modules/orders/controllers/GetOneOrderController";
import { UpdateOrderController } from "@modules/orders/controllers/UpdateOrderController";
import { Router } from "express";

const ordersRoutes = Router();

const createOrderController = new CreateOrderController();
const getAllOrdersController = new GetAllOrdersController();
const getOneOrderController = new GetOneOrderController();
const updateOrderController = new UpdateOrderController();
const deleteOrderController = new DeleteOrderController();

ordersRoutes.post("/", createOrderController.handle);
ordersRoutes.get("/", getAllOrdersController.handle);
ordersRoutes.get("/:id", getOneOrderController.handle);
ordersRoutes.put("/:id", updateOrderController.handle);
ordersRoutes.delete("/:id", deleteOrderController.handle);

export { ordersRoutes };
