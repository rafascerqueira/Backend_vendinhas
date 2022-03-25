import { Container } from "inversify";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import TYPES from "./types";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

const container = new Container();
container.bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository);

export default container;
