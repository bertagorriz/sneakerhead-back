import { Router } from "express";
import { validate } from "express-validation";
import { loginUser } from "../../controller/userControllers/userController.js";
import paths from "../../paths/paths.js";
import loginSchema from "../../../utils/Schemas/loginSchema.js";

const userRouter = Router();

userRouter.post(
  paths.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
