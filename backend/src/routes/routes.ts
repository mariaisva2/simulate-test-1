import {Router} from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";

const routes:Router = Router();
routes.use("/auth", authRouter);
routes.use("/users", userRouter);
export default routes;