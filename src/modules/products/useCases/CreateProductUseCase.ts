import TYPES from "@shared/container/types";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "inversify";
import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { IProductsRepository } from "../repositories/IProductsRepository";

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject(TYPES.ProductsRepository)
    private productsRepository: IProductsRepository
  ) {}

  async execute({ name, description, price }: ICreateProductDTO) {
    const productAlreadyExists = await this.productsRepository.findByName(name);

    if (productAlreadyExists) throw new AppError("Customer already exists");

    const product = await this.productsRepository.create({
      name,
      description,
      price,
    });

    return product;
  }
}
