import express, {Express} from "express";
import { configDotenv } from "dotenv";

configDotenv(); //Configuración para el manejo de las variables de entorno 
const app:Express = express(); // Iniciar un proyecto con express
app.use(express.json); //Middleware for permitir la transfernecia en formato json
app.use("/api",); //Middleware de enrutamiento 

