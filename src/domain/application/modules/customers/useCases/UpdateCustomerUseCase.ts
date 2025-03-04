import { Customer } from "@prisma/client";
import TYPES from "domain/application/shared/container/types";
import { AppError } from "domain/application/shared/errors/AppError";
import { inject, injectable } from "inversify";
import { IUpdateCustomerDTO } from "../dtos/IUpdateCustomerDTO";
import { ICustomersRepository } from "../repositores/ICustomersRepository";

@injectable()
export class UpdateCustomerUseCase {
	constructor(
		@inject(TYPES.CustomersRepository)
		private customersRepository: ICustomersRepository,
	) {}

	async execute(id: string, payload: IUpdateCustomerDTO): Promise<Customer> {
		const customer = this.customersRepository.findById(id);

		if (!customer) throw new AppError("Customer was not found!");

		const updatedCustomer = this.customersRepository.update(id, payload);

		return updatedCustomer;
	}
}
