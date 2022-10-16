import container from "@shared/container/inversify.config";
import { Request, Response } from "express";
import { GetOneProductUseCase } from "../useCases/GetOneProductUseCase";

export class GetOneProductController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const findProduct = container.resolve(GetOneProductUseCase);

    const product = await findProduct.execute(parseInt(id));

    return response.json(product);
  }
}
