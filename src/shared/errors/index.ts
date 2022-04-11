import { NextFunction, Request, Response } from "express";
import { AppError } from "./AppError";

export default function handleErrors(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal Server Error - ${error.message}`,
  });
}
