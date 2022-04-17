import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomerDTO";
import { IUpdateCustomerDTO } from "@modules/customers/dtos/IUpdateCustomerDTO";
import { ICustomersRepository } from "@modules/customers/repositores/ICustomersRepository";
import { Customer, PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class CustomersRepository implements ICustomersRepository {
  private repository: PrismaClient;

  constructor() {
    this.repository = new PrismaClient();
  }

  async create(data: ICreateCustomerDTO): Promise<Customer> {
    return await this.repository.customer.create({ data });
  }

  async findByEmail(email: string): Promise<Customer | null> {
    return await this.repository.customer.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<Customer | null> {
    return await this.repository.customer.findUnique({ where: { id } });
  }

  async update(id: string, payload: IUpdateCustomerDTO): Promise<Customer> {
    return await this.repository.customer.update({
      where: { id },
      data: { ...payload },
    });
  }

  async delete(id: string): Promise<Customer> {
    return await this.repository.customer.delete({ where: { id } });
  }
}
