import {Router} from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import postRouter from "./postRouter";

const routes:Router = Router();
routes.use("/auth", authRouter);
routes.use("/users/", userRouter);
routes.use("/posts", postRouter);
export default routes;