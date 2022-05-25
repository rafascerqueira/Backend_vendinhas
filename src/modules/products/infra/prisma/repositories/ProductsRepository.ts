import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IUpdateProductDTO } from "@modules/products/dtos/IUpdateProductDTO";
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

  async getAll(): Promise<Product[]> {
    return await this.repository.product.findMany();
  }

  async update(
    id: number,
    { description, name, price }: IUpdateProductDTO
  ): Promise<Product> {
    return await this.repository.product.update({
      where: { id },
      data: {
        description,
        name,
        price: {
          update: {
            value: price,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<Product> {
    const [_, deleteProduct] = await this.repository.$transaction([
      this.repository.price.delete({ where: { product_id: id } }),
      this.repository.product.delete({ where: { id } }),
    ]);

    return deleteProduct;
  }
}
