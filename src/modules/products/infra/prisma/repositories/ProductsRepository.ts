import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IPricedProduct } from "@modules/products/interfaces/IPricedProduct";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { PrismaClient, Product } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class ProductsRepository implements IProductsRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = new PrismaClient();
  }

  async create(data: ICreateProductDTO): Promise<Product> {
    const { name, description, price } = data;
    const value = parseFloat(price).toFixed(2);

    const product = await this.repository.product.create({
      data: {
        name,
        description,
        price: {
          create: { value },
        },
      },
      include: { price: true },
    });

    return product;
  }

  async findById(id: number): Promise<Product | null> {
    const product = await this.repository.product.findUnique({
      where: { id },
      include: { price: { select: { value: true } } },
    });

    return product;
  }

  async findByName(name: string): Promise<Product | null> {
    const product = await this.repository.product.findFirst({
      where: { name },
      include: { price: { select: { value: true } } },
    });

    return product;
  }
}
