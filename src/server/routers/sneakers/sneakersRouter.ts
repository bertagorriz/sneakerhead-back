import { Router } from "express";
import paths from "../../paths/paths.js";
import { auth } from "../../middlewares/authMiddleware/authMiddleware.js";
import {
  deleteSneakers,
  getSneakers,
} from "../../controllers/sneakerController/sneakerController.js";

const sneakersRouter = Router();

sneakersRouter.get(paths.root, auth, getSneakers);

sneakersRouter.delete(paths.delete, auth, deleteSneakers);

export default sneakersRouter;
