import container from "domain/application/shared/container/inversify.config";
import { Request, Response } from "express";
import { GetOneOrderUseCase } from "../useCases/GetOneOrderUseCase";

export class GetOneOrderController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;

		const getOneOrder = container.resolve(GetOneOrderUseCase);

		const order = await getOneOrder.execute(parseInt(id));

		return response.json(order);
	}
}
