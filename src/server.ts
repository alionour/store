import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import morgan from "morgan";
import router from "./routes";
dotenv.config();

const app: express.Application = express();
const { NODE_ENV, PORT, PORT_TEST } = process.env;

// Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// for cors
app.use(cors());

app.get("/", function (_req: Request, res: Response) {
  res.status(200);
  res.json("Hello World!");
});
app.use(router);

if (NODE_ENV === "dev") {
  // for logging
  app.use(morgan("short"));
  // app listening
  app.listen(PORT, function () {
    console.log(`starting dev app on: http://localhost:${PORT}`);
  });
} else if (NODE_ENV === "test") {
  app.listen(PORT_TEST, function () {
    console.log(`starting test app on: http://localhost:${PORT}`);
  });
}

export default app;
