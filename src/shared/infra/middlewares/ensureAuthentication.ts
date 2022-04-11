import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";
import { JWTTokenMissingError } from "@shared/errors/JWTTokenMissingError";
import { JWTInvalidTokenError } from "@shared/errors/JWTInvalidTokenError";

interface IPayload {
  sub: string;
}

export async function ensureAAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new JWTTokenMissingError();
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, authConfig.jwt.secret) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new JWTInvalidTokenError();
  }
}
