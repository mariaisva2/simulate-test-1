import { container } from "tsyringe";
import UserService from "../services/userService";
import { Request, Response } from "express";
import Util from "../utils/util";

export default class UserController{

    static async getUsers(req: Request, res: Response):Promise<void>{
        const userService = container.resolve(UserService);
        const getUsers = await userService.getUsers();
        console.log(getUsers);
        if(!getUsers){
            res.status(404).json({message: "Error to get users"});
        }
        res.status(200).json({message: "users found", users: getUsers});
    }

    static async createUser(req:Request, res:Response):Promise<void>{
        const {name,email,password} = req.body;

        const dataVerify = Util.verifyData(name,email,password);
        if(!dataVerify){
            res.status(400).json({message: "Error to create user"});
        }
        const userService = container.resolve(UserService);
        const createdUser = await userService.postUser({name,email,password});
        res.status(201).json({message: "Created user correctly",user:createdUser})
    }
}