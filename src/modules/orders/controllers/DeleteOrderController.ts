import container from "@shared/container/inversify.config";
import { Request, Response } from "express";
import { DeleteOrderUseCase } from "../useCases/DeleteOrderUseCase";

export class DeleteOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const orderRepo = container.resolve(DeleteOrderUseCase);

    await orderRepo.execute(parseInt(id));

    return response.send();
  }
}
