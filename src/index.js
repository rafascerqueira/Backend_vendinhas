import express from "express";
import cors from "cors";
import routes from "./config/routes";

import "dotenv/config";

const allowlist = [process.env.BASEURL, "http://192.168.1.6:3000"];

const app = express();
const port = process.env.PORT;
// const corsOpts = {
//   origin: process.env.BASEURL,
//   optionsSuccessStatus: 200,
// };
const corsOpts = {
  origin: function (origin, callback) {
    if (allowlist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOpts));
app.use(routes);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
