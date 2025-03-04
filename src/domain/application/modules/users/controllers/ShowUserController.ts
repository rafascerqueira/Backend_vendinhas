import { Request, Response } from "express";
import container from "domain/application/shared/container/inversify.config";
import { ShowUserUseCase } from "../useCases/ShowUserUseCase";

export class ShowUserController {
	async handle(request: Request, response: Response) {
		const { id } = request.params;

		const findUser = container.resolve(ShowUserUseCase);

		const user = await findUser.execute(id);

		return response.json(user);
	}
}
