"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const UsersRepository_1 = require("@modules/users/infra/prisma/repositories/UsersRepository");
const types_1 = __importDefault(require("./types"));
const CustomersRepository_1 = require("@modules/customers/infra/prisma/repositories/CustomersRepository");
const ProductsRepository_1 = require("@modules/products/infra/prisma/repositories/ProductsRepository");
const OrdersRepository_1 = require("@modules/orders/infra/prisma/repositories/OrdersRepository");
const container = new inversify_1.Container();
container.bind(types_1.default.UsersRepository).to(UsersRepository_1.UsersRepository);
container
    .bind(types_1.default.CustomersRepository)
    .to(CustomersRepository_1.CustomersRepository);
container
    .bind(types_1.default.ProductsRepository)
    .to(ProductsRepository_1.ProductsRepository);
container.bind(types_1.default.OrdersRepository).to(OrdersRepository_1.OrdersRepository);
exports.default = container;
//# sourceMappingURL=inversify.config.js.map