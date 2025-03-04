import { AppError } from "./AppError";

export class JWTTokenMissingError extends AppError {
  constructor() {
    super("Oops! we don't have a Token.", 401);
  }
}
