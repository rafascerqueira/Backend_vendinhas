import container from "domain/application/shared/container/inversify.config";
import type { Request, Response } from "express";
import { GetOneProductUseCase } from "../useCases/GetOneProductUseCase";

export class GetOneProductController {
	async handle(request: Request, response: Response) {
		const { id } = request.params;

		const findProduct = container.resolve(GetOneProductUseCase);

		const product = await findProduct.execute(Number.parseInt(id));

		return response.json(product);
	}
}
