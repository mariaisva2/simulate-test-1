import { Express } from "express";
import sequelize from "../config/db";
import bcrypt from "bcrypt";
import { IError } from "../interfaces/errorInterface";
import { Json } from "sequelize/types/utils";
import { ISpot } from "../interfaces/spotInterface";
export default class Util{
    static async startServer(app: Express,PORT:number):Promise<void>{
        try{
            await sequelize.authenticate(); // Intentar conectar con la base de datos
            console.log({message: "Trying connect server"});
            await sequelize.sync(); // Sincroniza con la base de datos los modelos
            app.listen(PORT, ()=>console.log(`Server running on the port ${PORT}`));
        }catch(error){
            console.log({message: "Error with the method startServer"});
        }
    }

    static verifyData(...fields: (string | number)[]):boolean{
        return fields.every(field=>field);
    }

    static async encryptPassword(password: string): Promise<string>{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    }
    static async verifyPassword(password:string, passwordSave: string):Promise<boolean>{
        return bcrypt.compare(password, passwordSave);
    }

    static async fetchApi(url:string, options?: {method?: string, headers?: {}, body?:string}):Promise< ISpot[] | ISpot | IError>{
        try{
            const response = await fetch(url,options);
            if(!response.ok)throw new Error("Error with the response");
            return response.json();
        }catch(error){
            return ({message: "Error with the fetchApi", error})
        }
    }
}
