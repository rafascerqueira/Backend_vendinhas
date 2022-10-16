import { CreateCustomerController } from "@modules/customers/controllers/CreateCustomerController";
import { DeleteCustomerController } from "@modules/customers/controllers/DeleteCustomerController";
import { ShowCustomerController } from "@modules/customers/controllers/ShowCustomerController";
import { UpdateCustomerController } from "@modules/customers/controllers/UpdateCustomerController";
import { Router } from "express";

const customersRoutes = Router();

const createCustomerController = new CreateCustomerController();
const showCustomerController = new ShowCustomerController();
const updateCustomerController = new UpdateCustomerController();
const deleteCustomerController = new DeleteCustomerController();

customersRoutes.post("/", createCustomerController.handle);
customersRoutes.get("/:id", showCustomerController.handle);
customersRoutes.put("/:id", updateCustomerController.handle);
customersRoutes.delete("/:id", deleteCustomerController.handle);

export { customersRoutes };
