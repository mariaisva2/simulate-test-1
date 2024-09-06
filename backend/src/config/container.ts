
import "reflect-metadata";
import { container } from "tsyringe";
import UserService from "../services/userService";
import User from "../models/userModel";
import AuthService from "../services/authService";

container.registerSingleton<User>(User);
container.registerSingleton<AuthService>(AuthService);
container.registerSingleton<UserService>(UserService);
