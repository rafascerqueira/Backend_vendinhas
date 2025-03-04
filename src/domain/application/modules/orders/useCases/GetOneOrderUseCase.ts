import TYPES from "domain/application/shared/container/types";
import { inject, injectable } from "inversify";
import { IOrdersRepository } from "../repositories/IOrdersRepository";

@injectable()
export class GetOneOrderUseCase {
	constructor(
		@inject(TYPES.OrdersRepository)
		private ordersRepository: IOrdersRepository,
	) {}

	async execute(id: number) {
		return await this.ordersRepository.getById(id);
	}
}
