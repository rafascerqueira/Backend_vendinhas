import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { PrismaClient, User } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class UsersRepository implements IUsersRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = new PrismaClient();
  }

  async create(data: ICreateUserDTO): Promise<void> {
    await this.repository.user.create({ data });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.user.findUnique({ where: { email } });
  }
}
