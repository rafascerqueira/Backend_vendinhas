"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const customers_routes_1 = require("./customers.routes");
const orders_routes_1 = require("./orders.routes");
const products_routes_1 = require("./products.routes");
const users_routes_1 = require("./users.routes");
const routes = (0, express_1.Router)();
exports.routes = routes;
routes.get("/", (_, response) => {
    return response.json({ message: "Hello!" });
});
routes.use("/users", users_routes_1.usersRoutes);
routes.use("/customers", customers_routes_1.customersRoutes);
routes.use("/products", products_routes_1.productsRoutes);
routes.use("/orders", orders_routes_1.ordersRoutes);
//# sourceMappingURL=index.js.map