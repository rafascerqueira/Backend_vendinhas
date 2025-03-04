import container from "domain/application/shared/container/inversify.config";
import { Request, Response } from "express";
import { IProductListDTO } from "../dtos/IProductListDTO";
import { UpdateOrderUseCase } from "../useCases/UpdateOrderUseCase";

export class UpdateOrderController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const { productList } = request.body;

		const updateOrder = container.resolve(UpdateOrderUseCase);
		const order = updateOrder.execute(parseInt(id), productList);

		return response.json(order);
	}
}
