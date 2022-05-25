import container from "@shared/container/inversify.config";
import { Request, Response } from "express";
import { DeleteProductUseCase } from "../useCases/DeleteProductUseCase";

export class DeleteProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteProduct = container.resolve(DeleteProductUseCase);

    await deleteProduct.execute(parseInt(id));

    return response.send();
  }
}
