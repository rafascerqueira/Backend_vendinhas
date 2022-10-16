import { CreateProductController } from "@modules/products/controllers/CreateProductController";
import { DeleteProductController } from "@modules/products/controllers/DeleteProductController";
import { GetAllProductController } from "@modules/products/controllers/GetAllProductController";
import { GetOneProductController } from "@modules/products/controllers/GetOneProductController";
import { UpdateProductController } from "@modules/products/controllers/UpdateProductController";
import { Router } from "express";

const productsRoutes = Router();

const createProductController = new CreateProductController();
const getAllProductController = new GetAllProductController();
const getOneProductController = new GetOneProductController();
const updateProductController = new UpdateProductController();
const deleteProductController = new DeleteProductController();

productsRoutes.post("/", createProductController.handle);
productsRoutes.get("/", getAllProductController.handle);
productsRoutes.get("/:id", getOneProductController.handle);
productsRoutes.put("/:id", updateProductController.handle);
productsRoutes.delete("/:id", deleteProductController.handle);

export { productsRoutes };
