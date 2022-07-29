import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
//import { connect, close } from "./config/db.js";

//Routes
import taskRouter from "./routes/taskRouter.js";
import userRouter from "./routes/userRouter.js";
import statusRouter from "./routes/statusRouter.js";

const app = express();
app.use(express.json());

dotenv.config();

//connect(connection);

app.use("/api/tasks", taskRouter);
app.use("/api/users", userRouter);
app.use("/api/status", statusRouter);

console.log("Hola");

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Serveris running on port ${PORT}`);
});
