import { Router } from "express";
import paths from "../../paths/paths.js";
import { auth } from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  addSneakers,
  deleteSneakers,
  getSneakerById,
  getSneakers,
} from "../../controllers/sneakerController/sneakerController.js";
import { validate } from "express-validation";
import addSneakersSchema from "../../../utils/Schemas/addSneakersSchema.js";

const sneakersRouter = Router();

sneakersRouter.get(paths.root, auth, getSneakers);

sneakersRouter.delete(paths.delete, auth, deleteSneakers);

sneakersRouter.post(
  paths.addSneaker,
  auth,
  validate(addSneakersSchema, {}, { abortEarly: false }),
  addSneakers
);

sneakersRouter.get(paths.getSneaker, auth, getSneakerById);

export default sneakersRouter;
