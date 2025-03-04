import { ICreateUserDTO } from "domain/application/modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "domain/application/modules/users/repositories/IUsersRepository";
import { PrismaClient, User } from "@prisma/client";
import { injectable } from "inversify";
import bcript from "bcrypt";
import auth from "core/config/auth";

@injectable()
export class UsersRepository implements IUsersRepository {
	private repository: PrismaClient;

	constructor() {
		this.repository = new PrismaClient();
	}

	async create(data: ICreateUserDTO): Promise<void> {
		data.password = bcript.hashSync(data.password, auth.hashSaltRounds);
		await this.repository.user.create({ data });
	}

	async findByEmail(email: string): Promise<User | null> {
		return await this.repository.user.findUnique({
			where: {
				email,
			},
		});
	}

	async findById(id: string): Promise<User | null> {
		return await this.repository.user.findUnique({ where: { id } });
	}
}
