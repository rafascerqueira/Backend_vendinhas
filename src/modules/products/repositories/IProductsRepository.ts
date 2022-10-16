import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "@prisma/client";
import { IUpdateProductDTO } from "../dtos/IUpdateProductDTO";

export interface IProductsRepository {
  create: (data: ICreateProductDTO) => Promise<Product>;
  findById: (id: number) => Promise<Product | null>;
  findByName: (name: string) => Promise<Product | null>;
  getAll: () => Promise<Product[]>;
  update: (id: number, payload: IUpdateProductDTO) => Promise<Product>;
  delete: (id: number) => Promise<Product>;
}
