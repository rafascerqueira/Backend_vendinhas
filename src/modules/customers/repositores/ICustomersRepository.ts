import { ICreateCustomerDTO } from "../dtos/ICreateCustomerDTO";
import { Customer } from "@prisma/client";
import { IUpdateCustomerDTO } from "../dtos/IUpdateCustomerDTO";

export interface ICustomersRepository {
  create: (data: ICreateCustomerDTO) => Promise<Customer>;
  findByEmail: (email: string) => Promise<Customer | null>;
  findById: (id: string) => Promise<Customer | null>;
  update: (id: string, payload: IUpdateCustomerDTO) => Promise<Customer>;
}
