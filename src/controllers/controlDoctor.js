import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";

const doctorController = {};

doctorController.getDoctors = async (req, res, next) => {
  console.log("controller")
  try {
    console.log(req.doctor)
    const doctor = await prisma.doctor.findUnique({
      where: { id: req.doctor.id },
      omit: {
        password: true,
      },
    });
    console.log("doctor", doctor);
    res.json(doctor);
  } catch (error) {
    next(error);
  }
};

export default doctorController;