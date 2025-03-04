import "reflect-metadata";
import "module-alias/register";
import express from "express";
import "express-async-errors";
import cors from "cors";

import { routes } from "./routes";
import handleErrors from "domain/application/shared/errors";
import corsOption from "core/config/corsOption";

const app = express();

app.use(express.json());
app.use(cors(corsOption));
app.use(routes);

app.use(handleErrors);

export { app };
