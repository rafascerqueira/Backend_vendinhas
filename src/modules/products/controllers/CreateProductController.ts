import container from "@shared/container/inversify.config";
import { Request, Response } from "express";
import { CreateProductUseCase } from "../useCases/CreateProductUseCase";

export class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, description, price } = request.body;

    const createCustomer = container.resolve(CreateProductUseCase);

    await createCustomer.execute({ name, description, price });

    return response.status(201).send();
  }
}
