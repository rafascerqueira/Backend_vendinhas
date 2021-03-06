import express from "express";
import cors from "cors";
import routes from "./config/routes";

import "dotenv/config";

const app = express();
const port = process.env.PORT;
const corsOpts = {
  origin: process.env.BASEURL,
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOpts));
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
