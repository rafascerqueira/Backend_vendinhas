import { Container } from "inversify";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import TYPES from "./types";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { CustomersRepository } from "@modules/customers/infra/prisma/repositories/CustomersRepository";
import { ICustomersRepository } from "@modules/customers/repositores/ICustomersRepository";

const container = new Container();
container.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository);
container
  .bind<ICustomersRepository>(TYPES.CustomersRepository)
  .to(CustomersRepository);

export default container;
