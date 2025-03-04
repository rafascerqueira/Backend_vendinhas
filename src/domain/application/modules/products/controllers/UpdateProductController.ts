import container from "domain/application/shared/container/inversify.config";
import type { Request, Response } from "express";
import { UpdateProductUseCase } from "../useCases/UpdateProductUseCase";

export class UpdateProductController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const payload = request.body;

		const updateProduct = container.resolve(UpdateProductUseCase);
		const product = updateProduct.execute(Number.parseInt(id), payload);

		return response.json(product);
	}
}
