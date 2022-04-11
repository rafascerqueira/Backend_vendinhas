import { User } from "@prisma/client";
import TYPES from "@shared/container/types";
import { exclude } from "@shared/services/excludeFields";
import { inject, injectable } from "inversify";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class ShowUserUseCase {
  constructor(
    @inject(TYPES.UsersRepository)
    private usersRepository: IUsersRepository
  ) {}

  async execute(id: string): Promise<User | {}> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      return { message: "Uncaught user" };
    }

    // WARNING
    // This is a f#ck1ng important line. Don't delete it!
    const treatedUser = exclude(user, "password");

    return treatedUser;
  }
}
