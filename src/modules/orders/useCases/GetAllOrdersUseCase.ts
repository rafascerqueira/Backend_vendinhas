import TYPES from "@shared/container/types";
import { inject, injectable } from "inversify";
import { IOrdersRepository } from "../repositories/IOrdersRepository";

@injectable()
export class GetAllOrdersUseCase {
  constructor(
    @inject(TYPES.OrdersRepository)
    private ordersRepository: IOrdersRepository
  ) {}

  async execute() {
    return await this.ordersRepository.getAll();
  }
}
