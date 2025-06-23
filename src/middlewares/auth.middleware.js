import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const authCheck = (req, res, next) => {
  try {
    //Check Header
    const header = req.headers.authorization;
    console.log(header);
    if (!header) {
      createError(401, "Token is missing!");
    }

    //Split Token
    const token = header.split(" ")[1];
    console.log(token);

    //verify token
    jwt.verify(token, process.env.JWT_SECRET, (error, decode) => {
      console.log(error);
      console.log(decode);
      if (error) {
        createError(401, "Token is invalid!");
      }
      req.user = decode;
      req.doctor = decode;
      next();
    });
  } catch (error) {
    next(error);
  }
};
