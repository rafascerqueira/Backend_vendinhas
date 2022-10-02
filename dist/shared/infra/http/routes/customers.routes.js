"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customersRoutes = void 0;
const CreateCustomerController_1 = require("@modules/customers/controllers/CreateCustomerController");
const DeleteCustomerController_1 = require("@modules/customers/controllers/DeleteCustomerController");
const ShowCustomerController_1 = require("@modules/customers/controllers/ShowCustomerController");
const UpdateCustomerController_1 = require("@modules/customers/controllers/UpdateCustomerController");
const express_1 = require("express");
const customersRoutes = (0, express_1.Router)();
exports.customersRoutes = customersRoutes;
const createCustomerController = new CreateCustomerController_1.CreateCustomerController();
const showCustomerController = new ShowCustomerController_1.ShowCustomerController();
const updateCustomerController = new UpdateCustomerController_1.UpdateCustomerController();
const deleteCustomerController = new DeleteCustomerController_1.DeleteCustomerController();
customersRoutes.post("/", createCustomerController.handle);
customersRoutes.get("/:id", showCustomerController.handle);
customersRoutes.put("/:id", updateCustomerController.handle);
customersRoutes.delete("/:id", deleteCustomerController.handle);
//# sourceMappingURL=customers.routes.js.map