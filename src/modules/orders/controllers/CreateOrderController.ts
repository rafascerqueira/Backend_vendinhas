import container from "@shared/container/inversify.config";
import { Request, Response } from "express";
import { CreateOrderUseCase } from "../useCases/CreateOrderUseCase";

export class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customer_id, productList } = request.body;

    const createOrder = container.resolve(CreateOrderUseCase);

    const order = await createOrder.execute(customer_id, productList);

    return response.json(order);
  }
}
