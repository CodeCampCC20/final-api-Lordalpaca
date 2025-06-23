import express from "express";
import prisma from "../config/prisma.js";
import { authCheck } from "../middlewares/auth.middleware.js";
import doctorController from "../controllers/controlDoctor.js";


const doctorRouter = express.Router();

//ENDPOINT http://localhost:8778/doctors/me
doctorRouter.get("/me", authCheck, doctorController.getDoctors);
//doctorRouter.patch("/me", authCheck, doctorController.updateDoctors);

export default doctorRouter;
