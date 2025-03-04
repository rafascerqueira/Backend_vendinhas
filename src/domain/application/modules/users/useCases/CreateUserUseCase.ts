import { inject, injectable } from "inversify";
import TYPES from "domain/application/shared/container/types";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { AppError } from "domain/application/shared/errors/AppError";

@injectable()
export class CreateUserUseCase {
	constructor(
		@inject(TYPES.UsersRepository)
		private usersRepository: IUsersRepository,
	) {}

	async execute({ email, name, password }: ICreateUserDTO) {
		const userAlreadyExists = await this.usersRepository.findByEmail(email);

		if (userAlreadyExists) throw new AppError("User already exists!");

		const user = await this.usersRepository.create({ name, email, password });

		return user;
	}
}
