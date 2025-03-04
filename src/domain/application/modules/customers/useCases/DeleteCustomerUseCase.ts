import { Customer } from "@prisma/client";
import TYPES from "domain/application/shared/container/types";
import { AppError } from "domain/application/shared/errors/AppError";
import { inject, injectable } from "inversify";
import { ICustomersRepository } from "../repositores/ICustomersRepository";

@injectable()
export class DeleteCustomerUseCase {
	constructor(
		@inject(TYPES.CustomersRepository)
		private customersRepository: ICustomersRepository,
	) {}

	async execute(id: string): Promise<Customer> {
		const customer = await this.customersRepository.findById(id);

		if (!customer) throw new AppError("invalid or non-existent customer");

		return await this.customersRepository.delete(id);
	}
}
