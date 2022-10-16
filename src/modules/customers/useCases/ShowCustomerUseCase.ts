import { Customer } from "@prisma/client";
import TYPES from "@shared/container/types";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "inversify";
import { ICustomersRepository } from "../repositores/ICustomersRepository";

@injectable()
export class ShowCustomerUseCase {
  constructor(
    @inject(TYPES.CustomersRepository)
    private customersRepository: ICustomersRepository
  ) {}

  async execute(id: string): Promise<Customer> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) throw new AppError("Customer was not found!");

    return customer;
  }
}
