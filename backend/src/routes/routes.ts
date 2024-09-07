import {Router} from "express";
import userRouter from "./userRouter";
import authRouter from "./authRouter";
import spotRouter from "./spotRouter";

const routes:Router = Router();
routes.use("/auth", authRouter);
routes.use("/users", userRouter);
routes.use("/spots", spotRouter);
export default routes;