import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import Sneaker from "../../../database/models/Sneaker.js";
import { responseErrorData } from "../../../utils/responseData/responseErrorData.js";

const debug = createDebug(
  "sneakers-api:server:controllers:sneakerController:sneakerController"
);

export const getSneakers = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sneakers = await Sneaker.find().limit(10).exec();

    res.status(200).json({ sneakers });
  } catch (error) {
    const customError = responseErrorData.serverError;
    debug(error.message);
    next(customError);
  }
};
