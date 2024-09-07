
import { Request,Response } from "express";
import { container } from "tsyringe";
import SpotService from "../services/spotService";
export default class SpotController{
    static async getSpots(_:Request, res:Response):Promise<void>{
        try{
            const spotService = container.resolve(SpotService);
            const getSpots = await spotService.getSpots();
            res.status(200).json({message: "Spots found", spots: getSpots});
        }catch(error){
            res.status(404).json({message: "Spots not found"})
        }
    }
}