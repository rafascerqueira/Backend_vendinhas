import container from "domain/application/shared/container/inversify.config";
import type { Request, Response } from "express";
import { GetAllProductUseCase } from "../useCases/GetAllProductUseCase";

export class GetAllProductController {
	async handle(_: Request, response: Response): Promise<Response> {
		const getAllProduct = container.resolve(GetAllProductUseCase);

		const products = await getAllProduct.execute();

		return response.json(products);
	}
}
