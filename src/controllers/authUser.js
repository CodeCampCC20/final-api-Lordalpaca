import prisma from "../config/prisma.js";
import { createError } from "../utils/createError.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const userRegister = async (req, res, next) => {
  try {
    //1. Check Body
    console.log(req.body);
    const { username, password, confirmPassword } = req.body;

    //2. Check username in db
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log("user", user);
    if (user) {
      createError(400, "Username already exist");
    }
    //3. Encrypt Password
    const hashPassword = bcrypt.hashSync(password, 10);
    console.log("hashPassword", hashPassword);

    //4. Save to db -> prisma
    const result = await prisma.user.create({
      data: {
        username,
        password: hashPassword,
      },
    });
    res.json({ message: "Register user Successfully" });
  } catch (error) {
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    // Check Body
    const { username, password } = req.body;

    //Check Username
    const user = await prisma.user.findFirst({
      where: {
        username: username,
      },
    });
    console.log("user", user);
    if (!user) {
      createError(400, "Username or password is invalid");
    }

    //Check Passeord
    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      createError(400, "Username or password is invalid");
    }

    //Generate Token
    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({
      id: user.id,
      username: username,
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};
