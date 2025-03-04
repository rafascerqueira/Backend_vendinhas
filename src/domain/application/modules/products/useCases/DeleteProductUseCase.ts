import { Product } from "@prisma/client";
import TYPES from "domain/application/shared/container/types";
import { AppError } from "domain/application/shared/errors/AppError";
import { inject, injectable } from "inversify";
import { IProductsRepository } from "../repositories/IProductsRepository";

@injectable()
export class DeleteProductUseCase {
	constructor(
		@inject(TYPES.ProductsRepository)
		private productsRepository: IProductsRepository,
	) {}

	async execute(id: number): Promise<Product> {
		const product = await this.productsRepository.findById(id);

		if (!product) throw new AppError("Invalid or non-existent product");

		return await this.productsRepository.delete(id);
	}
}
