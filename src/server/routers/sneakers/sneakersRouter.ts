import { Router } from "express";
import paths from "../../paths/paths.js";
import { auth } from "../../middlewares/authMiddleware/authMiddleware.js";
import { getSneakers } from "../../controllers/sneakerController/sneakerController.js";

const sneakersRouter = Router();

sneakersRouter.get(paths.root, auth, getSneakers);

export default sneakersRouter;
