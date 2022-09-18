import { Order } from "@prisma/client";
import TYPES from "@shared/container/types";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "inversify";
import { IProductListDTO } from "../dtos/IProductListDTO";
import { IOrdersRepository } from "../repositories/IOrdersRepository";

@injectable()
export class UpdateOrderUseCase {
  constructor(
    @inject(TYPES.OrdersRepository)
    private ordersRespository: IOrdersRepository
  ) {}

  async execute(id: number, productList: IProductListDTO[]): Promise<Order> {
    const order = this.ordersRespository.getById(id);

    if (!order) throw new AppError("There is no Order to update");

    const updateOrder = this.ordersRespository.update(id, productList);

    return updateOrder;
  }
}
