import { Router } from "express";
import PostController from "../controllers/postController";

const postRouter:Router = Router();
postRouter.get("/", PostController.getPost);
postRouter.get("/:id", PostController.getPostById);
export default postRouter;