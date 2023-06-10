import "../../loadEnvironment.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import {
  generalError,
  notFoundError,
} from "../middlewares/errorMiddleware/errorMiddlewares.js";
import { pingController } from "../controllers/pingController/pingController.js";
import paths from "../paths/paths.js";
import userRouter from "../routers/users/userRouter.js";
import sneakersRouter from "../routers/sneakers/sneakersRouter.js";

const allowedOrigins = [
  process.env.ALLOWED_ORIGIN_DEV!,
  process.env.ALLOWED_ORIGIN_PROD!,
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));

app.get(paths.ping, pingController);

app.use(paths.user, userRouter);

app.use(paths.sneakers, sneakersRouter);

app.use(notFoundError);

app.use(generalError);
