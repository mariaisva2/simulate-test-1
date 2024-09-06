import {Router} from "express";
import AuthController from "../controllers/authController";

const authRouter:Router = Router();
authRouter.get("/", AuthController.loginUser);
authRouter.post("/",AuthController.registerUser);
export default authRouter;