import "../../../loadEnvironment.js";
import jwt from "jsonwebtoken";
import { type NextFunction, type Response } from "express";
import { type CustomRequest } from "../../../types";
import { responseErrorData } from "../../../utils/responseData/responseErrorData.js";
import type CustomError from "../../../CustomError/CustomError.js";

export const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader?.includes("Bearer")) {
      const customError = responseErrorData.tokenNotFound;

      throw customError;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const payload = jwt.verify(token, process.env.JWT_SECRET!);

    const userId = payload.sub as string;

    req.userId = userId;

    next();
  } catch (error: unknown) {
    const customError =
      (error as CustomError).name === "JsonWebTokenError"
        ? responseErrorData.invalidToken
        : error;

    next(customError);
  }
};
