import { Product } from "@prisma/client";
import TYPES from "domain/application/shared/container/types";
import { AppError } from "domain/application/shared/errors/AppError";
import { inject, injectable } from "inversify";
import { IUpdateProductDTO } from "../dtos/IUpdateProductDTO";
import { IProductsRepository } from "../repositories/IProductsRepository";

@injectable()
export class UpdateProductUseCase {
	constructor(
		@inject(TYPES.ProductsRepository)
		private productsRepository: IProductsRepository,
	) {}

	async execute(id: number, payload: IUpdateProductDTO): Promise<Product> {
		const product = this.productsRepository.findById(id);

		if (!product) throw new AppError("There is no Product to update");

		const updateProduct = this.productsRepository.update(id, payload);

		return updateProduct;
	}
}
