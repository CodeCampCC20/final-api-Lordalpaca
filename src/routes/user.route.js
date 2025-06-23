import express from "express";
import prisma from "../config/prisma.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import userController from "../controllers/controlUser.js";

const userRouter = express.Router();

//ENDPOINT http://localhost:8778/users/me
userRouter.get("/me", authCheck, userController.getUsers);
userRouter.patch("/me", authCheck, userController.updateUser);


export default userRouter;
