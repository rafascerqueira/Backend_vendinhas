import { config } from "dotenv";

config();

export default {
  origin: process.env.BASEURL,
  optionsSuccessStatus: 200,
};
