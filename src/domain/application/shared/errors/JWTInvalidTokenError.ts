import { AppError } from "./AppError";

export class JWTInvalidTokenError extends AppError {
  constructor() {
    super("Ouch! It's a invalid token.", 401);
  }
}
