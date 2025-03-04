import container from "domain/application/shared/container/inversify.config";
import type { Request, Response } from "express";
import { CreateProductUseCase } from "../useCases/CreateProductUseCase";

export class CreateProductController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { name, description, price } = request.body;

		const createProduct = container.resolve(CreateProductUseCase);

		await createProduct.execute({ name, description, price });

		return response.status(201).send();
	}
}
