import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { routes } from "./routes";
import dotenv from "dotenv";
import { AppError } from "@shared/errors/AppError";

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({ message: error.message });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal Server Error - ${error.message}`,
    });
  }
);

export { app };
