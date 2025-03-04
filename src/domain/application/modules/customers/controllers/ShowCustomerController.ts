import container from "domain/application/shared/container/inversify.config";
import { Request, Response } from "express";
import { ShowCustomerUseCase } from "../useCases/ShowCustomerUseCase";

export class ShowCustomerController {
	async handle(request: Request, response: Response) {
		const { id } = request.params;

		const findCustomer = container.resolve(ShowCustomerUseCase);

		const customer = await findCustomer.execute(id);

		return response.json(customer);
	}
}
