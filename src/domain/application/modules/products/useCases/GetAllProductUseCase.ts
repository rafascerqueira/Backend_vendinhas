import TYPES from "domain/application/shared/container/types";
import { inject, injectable } from "inversify";
import { IProductsRepository } from "../repositories/IProductsRepository";

@injectable()
export class GetAllProductUseCase {
	constructor(
		@inject(TYPES.ProductsRepository)
		private productsRepository: IProductsRepository,
	) {}

	async execute() {
		return await this.productsRepository.getAll();
	}
}
