import "../../loadEnvironment.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
  generalError,
  notFoundError,
} from "../middlewares/errorMiddlewares.js";
import { pingController } from "../controller/pingController/pingController.js";
import path from "../paths/paths.js";
import userRouter from "../routers/users/userRouter.js";

const allowedOrigins = [process.env.ALLOWED_ORIGIN_DEV!];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

app.get(path.ping, pingController);

app.use(path.user, userRouter);

app.use(notFoundError);

app.use(generalError);
