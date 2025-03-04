import container from "domain/application/shared/container/inversify.config";
import { Request, Response } from "express";
import { GetAllOrdersUseCase } from "../useCases/GetAllOrdersUseCase";

export class GetAllOrdersController {
	async handle(_: Request, response: Response): Promise<Response> {
		const getAllOrders = container.resolve(GetAllOrdersUseCase);

		const orders = await getAllOrders.execute();

		return response.json(orders);
	}
}
