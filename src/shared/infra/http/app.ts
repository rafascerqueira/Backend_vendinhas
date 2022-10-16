import "reflect-metadata";
import "module-alias/register";
import express from "express";
import "express-async-errors";
import cors from "cors";

import { routes } from "./routes";
import dotenv from "dotenv";
import handleErrors from "@shared/errors";
import corsOption from "@config/corsOption";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors(corsOption));
app.use(routes);

app.use(handleErrors);

export { app };
