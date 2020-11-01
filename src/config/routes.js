import express from "express";

import {
  save,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userHandler";
import {
  store as newCustomer,
  index as showCustomers,
} from "../controllers/customerHandler";
import {
  store as newProduct,
  index as showProducts,
  update as updtProduct,
} from "../controllers/productHandler";
import {
  store as newOrder,
  index as showOrders,
  update as updtOrder,
  delete as deleteOrder,
  showSelectedOrders,
} from "../controllers/orderHandler";
import {
  store as newSale,
  index as showSales,
} from "../controllers/shopHandler";

import {
  index as getBill,
  store as newBill,
  update as downBill,
  showSelectedBills,
} from "../controllers/billingHandler";

import { signin, validateToken } from "./auth";
import passport from "./passport";

const routes = express.Router();
const auth = passport();

routes.post("/signup", save);
routes.post("/signin", signin);
routes.post("/validate", validateToken);

routes.route("/users").all(auth.authenticate()).get(getUser);

routes
  .route("/users/:id")
  .all(auth.authenticate())
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

routes
  .route("/customer")
  .all(auth.authenticate())
  .get(showCustomers)
  .post(newCustomer);

routes
  .route("/product")
  .all(auth.authenticate())
  .get(showProducts)
  .post(newProduct)
  .put(updtProduct);

routes
  .route("/order")
  .all(auth.authenticate())
  .get(showOrders)
  .post(newOrder)
  .put(updtOrder)
  .delete(deleteOrder);

routes.route("/order/list").all(auth.authenticate()).post(showSelectedOrders);

routes.route("/sale").all(auth.authenticate()).get(showSales).post(newSale);

routes
  .route("/billing")
  .all(auth.authenticate())
  .get(getBill)
  .post(newBill)
  .put(downBill);

routes.route("/billing/bills").all(auth.authenticate()).post(showSelectedBills);

export default routes;
