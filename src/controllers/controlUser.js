import { createError } from "../utils/createError.js";
import prisma from "../config/prisma.js";

const userController = {};

userController.getUsers = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      omit: {
        password: true,
      },
    });
    console.log("user", user);
    console.log("4444444444444444");
    res.json(user);
  } catch (error) {
    console.log("5555555555555555");
    next(error);
  }
};

userController.updateUser = async (req, res, next) => {
  //Read params & body
  const { id } = req.params;
  const { username } = req.body;
  console.log(id, username);
  //Update to DB
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      username: username,
    },
  });
  res.json({
    id: user.id,
    username: username,
  });
};

export default userController;
