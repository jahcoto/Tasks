//Se importan las libereias necesarias para el proyecto
import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
import cors from "cors";

//import { connect, close } from "./config/db.js";

//Declaracion de las Rutas
import taskRouter from "./routes/taskRouter.js";
import userRouter from "./routes/userRouter.js";
import statusRouter from "./routes/statusRouter.js";

const app = express();
app.use(express.json());

//Configuracion del dotenv
dotenv.config();

//Configure CORS
//Session de la whitelist, los urls de los sitios permitidos para accesar a nuestras APIs
const whitelist = [
  "http://127.0.0.1:5500",
  "http://127.0.0.1:8080",
  "http://127.0.0.1:5501",
];
//Opciones del CORS
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      //Se da acceso a la API
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};
//Uso del CORS
app.use(cors(corsOptions));
//connect(connection);

app.use("/api/tasks", taskRouter); //Uso de la ruta de Tasks en el app
app.use("/api/users", userRouter); //Uso de la ruta de Users en el app
app.use("/api/status", statusRouter); //Uso de la ruta de Status en el app

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Serveris running on port ${PORT}`);
});
