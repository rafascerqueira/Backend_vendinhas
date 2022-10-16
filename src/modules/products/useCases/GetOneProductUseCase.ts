import { Product } from "@prisma/client";
import TYPES from "@shared/container/types";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "inversify";
import { IProductsRepository } from "../repositories/IProductsRepository";

@injectable()
export class GetOneProductUseCase {
  constructor(
    @inject(TYPES.ProductsRepository)
    private productsRepository: IProductsRepository
  ) {}

  async execute(id: number): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError("Product was not found!");

    return product;
  }
}
