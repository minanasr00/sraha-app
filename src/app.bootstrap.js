import express from "express";
import morgan from "morgan";
import { authenticateDB } from "./db/index.js";
import { errorResponse, wrongRouteResponse } from "./common/index.js";
import { userRouter } from "./modules/index.js";
import { port } from "../config/config.service.js";

export default async function bootstrap() {
  const app = express();

  //DB connection
  await authenticateDB();

  //middleWares
  if (process.env.NODE_ENV === "development") app.use(morgan("combined"));
  app.use(express.json());

  //route handling
  app.use("/user", userRouter);

  //route handling error
  app.use("{/*dummy}", (req, res) => {
    wrongRouteResponse(res);
  });

  //error handling
  app.use((err, req, res, next) => {
    errorResponse({ error: err, res });
  });

  //create server
  app.listen(port, (error) => {
    if (error) return console.log("Server error ❌: ", error.message);
    console.log("Server running successfully on port 3000 🚀");
  });
}
