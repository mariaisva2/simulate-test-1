import {Sequelize} from "sequelize-typescript";
import { configDotenv } from "dotenv";
import User from "../models/userModel";

configDotenv();

const sequelize:Sequelize = new Sequelize({
    dialect: "mysql",
    port: parseInt(process.env.DB_PORT!),
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    models: [User]
});

export default sequelize;
