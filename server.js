import express from "express";
import cors from "cors";
import { forbiddenMiddleware } from "./src/middlewares/forbidden.middleware.js";
import { unauthorizedMiddleware } from "./src/middlewares/unauthorized.middleware.js";
import { notFoundMiddleware } from "./src/middlewares/not-found.middlewares.js";
import { errorMiddleware } from "./src/middlewares/errorMiddleware.js";
import { userLogin, userRegister } from "./src/controllers/authUser.js";
import { doctorLogin, doctorRegister } from "./src/controllers/authDoctor.js";
import userRouter from "./src/routes/user.route.js";

const app = express();

app.use(express.json());
app.use(cors());

//USER
app.use("/auth/register/user", userRegister);
app.use("/auth/login/user", userLogin);

//DOCTOR
app.use("/auth/register/doctor", doctorRegister);
app.use("/auth/login/doctor", doctorLogin);

//USER MANAGE
app.use("/users", userRouter)

app.use(errorMiddleware);
app.use(forbiddenMiddleware);
app.use(unauthorizedMiddleware);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 8778;
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
