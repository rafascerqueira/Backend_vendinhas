import container from "domain/application/shared/container/inversify.config";
import { Request, Response } from "express";
import { UpdateCustomerUseCase } from "../useCases/UpdateCustomerUseCase";

export class UpdateCustomerController {
	async handle(request: Request, response: Response): Promise<Response> {
		const { id } = request.params;
		const payload = request.body;

		const updateCustomer = container.resolve(UpdateCustomerUseCase);

		const customer = updateCustomer.execute(id, payload);

		return response.json(customer);
	}
}
