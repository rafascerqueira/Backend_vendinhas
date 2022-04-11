import container from "@shared/container/inversify.config";
import { Request, Response } from "express";
import { CreateCustomerUseCase } from "../useCases/CreateCustomerUseCase";

export class CreateCustomerController {
  async handle(request: Request, response: Response) {
    const { name, email } = request.body;

    const createCustomer = container.resolve(CreateCustomerUseCase);

    await createCustomer.execute({ name, email });

    return response.status(201).send();
  }
}
