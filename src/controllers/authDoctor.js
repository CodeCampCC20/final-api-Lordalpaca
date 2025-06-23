 import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const doctorRegister = async (req, res, next) => {
  try {
    //1. Check Body
    console.log(req.body);
    const { username, password, confirmPassword, specialization } = req.body;

    //2. Check username in db
    const doctor = await prisma.doctor.findFirst({
      where: {
        username: username,
      },
    });
    console.log("doctor", doctor);
    if (doctor) {
      createError(400, "Username already exist");
    }
    //3. Encrypt Password
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log("hashPassword", hashPassword);

    //4. Save to db -> prisma
    const result = await prisma.doctor.create({
      data: {
        username,
        password: hashPassword,
        specialization,
      },
    });
    res.json({ message: "Register doctor Successfully" });
  } catch (error) {
    next(error);
  }
};

export const doctorLogin = async (req, res, next) => {
  try {
    // Check Body
    const { username, password } = req.body;
    console.log(req.body)
    //Check Username
    const doctor = await prisma.doctor.findUnique({
      where: {
        username: username,
      },
    });
    console.log("doctor", doctor);
    if (!doctor) {
      createError(400, "Username or password is invalid");
    }

    //Check Passeord
    const checkPassword = bcrypt.compareSync(password, doctor.password);

    if (!checkPassword) {
      createError(400, "Username or password is invalid!!!");
    }

    //Generate Token
    const payload = {
      id: doctor.id,
      role: doctor.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      id: doctor.id,
      username: username,
      specialization: doctor.specialization,
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};
