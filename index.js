import express from "express";
import consign from "consign";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

consign({ cwd: "src" })
  .include("models")
  .then("controllers")
  .then("config")
  .into(app);

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
