import { Request, Response } from "express";
import container from "@shared/container/inversify.config";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserUseCase);

    await createUser.execute({ name, email, password });

    return response.status(201).send();
  }
}
