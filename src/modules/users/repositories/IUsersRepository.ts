import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "@prisma/client";

export interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<User | void>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: string) => Promise<User | null>;
}
