import { Router } from "express";
import paths from "../../paths/paths.js";
import {
  addSneakers,
  deleteSneakers,
  getSneakerById,
  getSneakers,
} from "../../controllers/sneakerController/sneakerController.js";
import { validate } from "express-validation";
import addSneakersSchema from "../../../utils/Schemas/addSneakersSchema.js";

const sneakersRouter = Router();

sneakersRouter.get(paths.root, getSneakers);

sneakersRouter.delete(paths.delete, deleteSneakers);

sneakersRouter.post(
  paths.addSneaker,
  validate(addSneakersSchema, {}, { abortEarly: false }),
  addSneakers
);

sneakersRouter.get(paths.getSneaker, getSneakerById);

export default sneakersRouter;
