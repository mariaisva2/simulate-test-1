import { Express } from "express";

export default class Util{
    static async startServer(app:Express, port: number): Promise<void>{
        try{
            //Llamar sequelize authenticate y syn

        }catch(error){
            console.log({message: "Error with the startServer. Try again!"})
        }
    }
}