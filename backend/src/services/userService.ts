import { inject, injectable } from "tsyringe";
import User from "../models/userModel";
import UserRepository from "../repositories/userRepository";

@injectable()
export default class UserService{
    constructor(@inject(UserRepository) private userRepository:UserRepository){}
    async getUsers():Promise<User[] | {message: string, error: unknown}>{
        return await this.userRepository.getUsers();
    }

    async postUser(user: Partial<User>):Promise<User | {message: string, error: unknown}>{
        return await this.userRepository.postUsers(user);
    }
}