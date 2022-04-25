import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "@prisma/client";

export interface IProductsRepository {
  create: (data: ICreateProductDTO) => Promise<Product>;
  findById: (id: number) => Promise<Product | null>;
  findByName: (name: string) => Promise<Product | null>;
}
