import { type NextFunction, type Request, type Response } from "express";
import createDebug from "debug";
import Sneaker from "../../../database/models/Sneaker.js";
import { responseErrorData } from "../../../utils/responseData/responseErrorData.js";
import {
  type LoadSneakersCustomRequest,
  type AddSneakersCustomRequest,
} from "../../../types.js";
import { Types } from "mongoose";

const debug = createDebug(
  "sneakers-api:server:controllers:sneakerController:sneakerController"
);

export const getSneakers = async (
  req: LoadSneakersCustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      query: { limit },
    } = req;

    const limitSneakers = Number(limit);

    const sneakers = await Sneaker.find().limit(limitSneakers).exec();

    const totalSneakers = await Sneaker.where().countDocuments();

    res.status(200).json({ sneakers, totalSneakers });
  } catch (error) {
    const customError = responseErrorData.serverError;
    debug(error.message);
    next(customError);
  }
};

export const deleteSneakers = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const sneakerToDelete = await Sneaker.findByIdAndDelete(id).exec();

    if (!sneakerToDelete) {
      const customError = responseErrorData.idNotFound;

      throw customError;
    }

    res.status(200).json({ message: "Sneaker successfully deleted" });
  } catch (error) {
    next(error);
  }
};

export const addSneakers = async (
  req: AddSneakersCustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, body } = req;

    const newSneaker = await Sneaker.create({
      ...body,
      user: new Types.ObjectId(userId),
    });

    if (!newSneaker) {
      const customError = responseErrorData.sneakerNotFound;

      throw customError;
    }

    res.status(201).json({ newSneaker });
  } catch (error) {
    next(error);
  }
};
