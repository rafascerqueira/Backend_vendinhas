import container from "@shared/container/inversify.config";
import { Request, Response } from "express";
import { DeleteCustomerUseCase } from "../useCases/DeleteCustomerUseCase";

export class DeleteCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const customerRepo = container.resolve(DeleteCustomerUseCase);

    await customerRepo.execute(id);

    return response.send();
  }
}
