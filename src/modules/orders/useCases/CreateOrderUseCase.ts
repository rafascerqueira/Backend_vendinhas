import { ICustomersRepository } from "@modules/customers/repositores/ICustomersRepository";
import { Order } from "@prisma/client";
import TYPES from "@shared/container/types";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "inversify";
import { IProductListDTO } from "../dtos/IProductListDTO";
import { IOrdersRepository } from "../repositories/IOrdersRepository";

@injectable()
export class CreateOrderUseCase {
  constructor(
    @inject(TYPES.OrdersRepository)
    private ordersRepository: IOrdersRepository,
    @inject(TYPES.CustomersRepository)
    private customersRepository: ICustomersRepository
  ) {}

  async execute(
    customer_id: string,
    productList: IProductListDTO[]
  ): Promise<Order> {
    const customerAlreadyExists = await this.customersRepository.findById(
      customer_id
    );

    if (!customerAlreadyExists) throw new AppError("Customer not found");

    const order = await this.ordersRepository.create(customer_id, productList);

    return order;
  }
}
