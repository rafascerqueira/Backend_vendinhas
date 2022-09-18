import { Order } from "@prisma/client";
import TYPES from "@shared/container/types";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "inversify";
import { IOrdersRepository } from "../repositories/IOrdersRepository";

@injectable()
export class DeleteOrderUseCase {
  constructor(
    @inject(TYPES.OrdersRepository)
    private orderRepository: IOrdersRepository
  ) {}

  async execute(id: number): Promise<Order> {
    const order = await this.orderRepository.getById(id);

    if (!order) throw new AppError("Invalid or non-existing order");

    return await this.orderRepository.delete(id);
  }
}
