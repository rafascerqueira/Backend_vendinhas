import TYPES from "@shared/container/types";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "inversify";
import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { IProductsRepository } from "../repositories/IProductsRepository";

@injectable()
export class CreateProductUseCase {
  constructor(
    @inject(TYPES.ProductsRepository)
    private customersRepository: IProductsRepository
  ) {}

  async execute({ name, description, price }: ICreateProductDTO) {
    const productAlreadyExists = await this.customersRepository.findByName(
      name
    );

    if (productAlreadyExists) throw new AppError("Customer already exists");

    const product = await this.customersRepository.create({
      name,
      description,
      price,
    });

    return product;
  }
}
