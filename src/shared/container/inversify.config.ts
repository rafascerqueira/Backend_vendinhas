import { Container } from "inversify";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import TYPES from "./types";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { CustomersRepository } from "@modules/customers/infra/prisma/repositories/CustomersRepository";
import { ICustomersRepository } from "@modules/customers/repositores/ICustomersRepository";
import { ProductsRepository } from "@modules/products/infra/prisma/repositories/ProductsRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { OrdersRepository } from "@modules/orders/infra/prisma/repositories/OrdersRepository";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";

const container = new Container();
container.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository);
container
  .bind<ICustomersRepository>(TYPES.CustomersRepository)
  .to(CustomersRepository);
container
  .bind<IProductsRepository>(TYPES.ProductsRepository)
  .to(ProductsRepository);
container.bind<IOrdersRepository>(TYPES.OrdersRepository).to(OrdersRepository);

export default container;
