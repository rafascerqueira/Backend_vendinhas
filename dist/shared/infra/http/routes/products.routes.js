"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productsRoutes = void 0;
const CreateProductController_1 = require("@modules/products/controllers/CreateProductController");
const DeleteProductController_1 = require("@modules/products/controllers/DeleteProductController");
const GetAllProductController_1 = require("@modules/products/controllers/GetAllProductController");
const GetOneProductController_1 = require("@modules/products/controllers/GetOneProductController");
const UpdateProductController_1 = require("@modules/products/controllers/UpdateProductController");
const express_1 = require("express");
const productsRoutes = (0, express_1.Router)();
exports.productsRoutes = productsRoutes;
const createProductController = new CreateProductController_1.CreateProductController();
const getAllProductController = new GetAllProductController_1.GetAllProductController();
const getOneProductController = new GetOneProductController_1.GetOneProductController();
const updateProductController = new UpdateProductController_1.UpdateProductController();
const deleteProductController = new DeleteProductController_1.DeleteProductController();
productsRoutes.post("/", createProductController.handle);
productsRoutes.get("/", getAllProductController.handle);
productsRoutes.get("/:id", getOneProductController.handle);
productsRoutes.put("/:id", updateProductController.handle);
productsRoutes.delete("/:id", deleteProductController.handle);
//# sourceMappingURL=products.routes.js.map