import {Router} from "express";
import UserController from "../controllers/userController";

const userRouter:Router = Router();
userRouter.get("/", UserController.getUsers);
userRouter.post("/", UserController.createUser);
userRouter.put("/:id", UserController.updateUser);

export default userRouter;