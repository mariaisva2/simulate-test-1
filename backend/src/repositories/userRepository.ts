import { injectable } from "tsyringe";
import User from "../models/userModel";
import { where } from "sequelize";

@injectable()
export default class UserRepository{
    async getUsers():Promise<User[] | {message: string, error:unknown}>{
        try{
            return await User.findAll();
        }catch(error){
            return ({message: "Error to connect model", error});
        }
    };

    async getUserByEmail(email:string):Promise<User | null | {message: string, error: unknown}>{
        try{
            return await User.findOne({
                where: {email}
            })       
        }catch(error){
            return({message: "Error to connect model", error})
        }
    }

    async postUsers(user:Partial<User>):Promise<User | {message: string, error: unknown}>{
        try{
            return await User.create(user);
        }catch(error){
            return ({message: "Error to connect model", error})
        }
    }

    
}