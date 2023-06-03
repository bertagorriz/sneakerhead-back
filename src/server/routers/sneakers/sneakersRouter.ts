import { Router } from "express";
import paths from "../../paths/paths";
import { auth } from "../../middlewares/authMiddleware/authMiddleware";
import { getSneakers } from "../../controllers/sneakerController/sneakerController";

const sneakersRouter = Router();

sneakersRouter.get(paths.root, auth, getSneakers);

export default sneakersRouter;
