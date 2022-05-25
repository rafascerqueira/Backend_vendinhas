import "reflect-metadata";
import express from "express";
import "express-async-errors";

import { routes } from "./routes";
import dotenv from "dotenv";
import handleErrors from "@shared/errors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(routes);

app.use(handleErrors);

export { app };