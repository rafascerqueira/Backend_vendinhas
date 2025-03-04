import type { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import type { Product } from "@prisma/client";
import type { IUpdateProductDTO } from "../dtos/IUpdateProductDTO";

export interface IProductsRepository {
	create: (data: ICreateProductDTO) => Promise<Product>;
	findById: (id: number) => Promise<Product | null>;
	findByName: (name: string) => Promise<Product | null>;
	getAll: () => Promise<Product[]>;
	update: (id: number, payload: IUpdateProductDTO) => Promise<Product>;
	delete: (id: number) => Promise<Product>;
}
