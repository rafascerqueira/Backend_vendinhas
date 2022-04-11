import { Request, Response } from "express";
import container from "@shared/container/inversify.config";
import { AuthenticateUserUseCase } from "../useCases/AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = container.resolve(AuthenticateUserUseCase);

    const authentication = await user.execute({ email, password });

    return response.json(authentication);
  }
}
