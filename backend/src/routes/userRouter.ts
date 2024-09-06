import {Router} from "express";
import UserController from "../controllers/userController";

const userRouter:Router = Router();
userRouter.get("/", UserController.getUsers);
userRouter.post("/", UserController.createUser);

export default userRouter;