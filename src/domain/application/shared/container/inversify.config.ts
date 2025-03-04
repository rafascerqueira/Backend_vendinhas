import { Container } from "inversify";
import { UsersRepository } from "domain/application/modules/users/infra/prisma/repositories/UsersRepository";
import TYPES from "./types";
import type { IUsersRepository } from "domain/application/modules/users/repositories/IUsersRepository";
import { CustomersRepository } from "domain/application/modules/customers/infra/prisma/repositories/CustomersRepository";
import type { ICustomersRepository } from "domain/application/modules/customers/repositores/ICustomersRepository";
import { ProductsRepository } from "domain/application/modules/products/infra/prisma/repositories/ProductsRepository";
import type { IProductsRepository } from "domain/application/modules/products/repositories/IProductsRepository";
import { OrdersRepository } from "domain/application/modules/orders/infra/prisma/repositories/OrdersRepository";
import type { IOrdersRepository } from "domain/application/modules/orders/repositories/IOrdersRepository";

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
