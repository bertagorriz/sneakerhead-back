import "../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import chalk from "chalk";
import type CustomError from "../../CustomError/CustomError.js";
import { responseErrorData } from "../../utils/responseErrorData.js";

const debug = createDebug("sneakers-api:server:middlewares:errorMiddlewares");

export const generalError = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(chalk.redBright(error.message));

  const statusCode = error.statusCode || 500;

  const message = error.statusCode ? error.message : "General error";

  res.status(statusCode).json({ message });
};

export const notFoundError = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const error = responseErrorData.endpointNotFound;

  next(error);
};
