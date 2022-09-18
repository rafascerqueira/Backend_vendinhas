import { Order } from "@prisma/client";
import { IProductListDTO } from "../dtos/IProductListDTO";

export interface IOrdersRepository {
  create: (customer_id: string, productList: IProductListDTO[]) => Promise<any>;
  getAll: () => Promise<Order[]>;
  getById: (id: number) => Promise<Order | null>;
  update: (id: number, productList: IProductListDTO[]) => Promise<Order>;
  delete: (id: number) => Promise<Order>;
}
