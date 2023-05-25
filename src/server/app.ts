import "../loadEnvironment.js";
import cors from "cors";
import express from "express";
import morgan from "morgan";

const allowedOrigins = [process.env.ALLOWED_ORIGIN_DEV!];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

export const app = express();

app.use(cors(options));

app.disable("x-powered-by");

app.use(express.json());

app.use(morgan("dev"));