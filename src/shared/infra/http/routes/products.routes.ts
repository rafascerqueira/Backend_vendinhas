import { CreateProductController } from "@modules/products/controllers/CreateProductController";
import { Router } from "express";

const productsRoutes = Router();

const createProductController = new CreateProductController();

productsRoutes.post("/", createProductController.handle);

export { productsRoutes };
