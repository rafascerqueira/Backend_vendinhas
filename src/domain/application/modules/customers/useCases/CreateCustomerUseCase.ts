import TYPES from "domain/application/shared/container/types";
import { AppError } from "domain/application/shared/errors/AppError";
import { inject, injectable } from "inversify";
import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { ICustomersRepository } from "../repositores/ICustomersRepository";

@injectable()
export class CreateCustomerUseCase {
	constructor(
		@inject(TYPES.CustomersRepository)
		private customersRepository: ICustomersRepository,
	) {}

	async execute({ name, email }: ICreateCustomerDTO) {
		const customerAlreadyExists =
			await this.customersRepository.findByEmail(email);

		if (customerAlreadyExists) throw new AppError("Customer already exists");

		const customer = await this.customersRepository.create({ name, email });

		return customer;
	}
}
