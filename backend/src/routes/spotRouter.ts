import { Router } from "express";
import SpotController from "../controllers/spotController";

const spotRouter:Router = Router();
spotRouter.get("/", SpotController.getSpots);
export default spotRouter;