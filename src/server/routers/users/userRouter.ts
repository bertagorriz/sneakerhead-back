import { Router } from "express";
import { loginUser } from "../../controller/userControllers/userController.js";

const userRouter = Router();

userRouter.post("/login", loginUser);

export default userRouter;
