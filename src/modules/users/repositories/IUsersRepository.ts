import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "@prisma/client";

export interface IUsersRepository {
  create: (data: ICreateUserDTO) => Promise<void>;
  findByEmail: (email: string) => Promise<User | null>;
}
