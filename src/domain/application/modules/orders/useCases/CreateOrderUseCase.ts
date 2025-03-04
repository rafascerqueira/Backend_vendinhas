import { ICustomersRepository } from "domain/application/modules/customers/repositores/ICustomersRepository";
import { Order } from "@prisma/client";
import TYPES from "domain/application/shared/container/types";
import { AppError } from "domain/application/shared/errors/AppError";
import { inject, injectable } from "inversify";
import { IProductListDTO } from "../dtos/IProductListDTO";
import { IOrdersRepository } from "../repositories/IOrdersRepository";

@injectable()
export class CreateOrderUseCase {
	constructor(
		@inject(TYPES.OrdersRepository)
		private ordersRepository: IOrdersRepository,
		@inject(TYPES.CustomersRepository)
		private customersRepository: ICustomersRepository,
	) {}

	async execute(
		customer_id: string,
		productList: IProductListDTO[],
	): Promise<Order> {
		const customerAlreadyExists =
			await this.customersRepository.findById(customer_id);

		if (!customerAlreadyExists) throw new AppError("Customer not found");

		const order = await this.ordersRepository.create(customer_id, productList);

		return order;
	}
}
