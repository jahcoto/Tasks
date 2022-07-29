import express from "express";

const taskRouter = express.Router();

//importamos el controller de Task
import {
  deleteTask,
  getTask,
  getTasks,
  newTask,
  updateTask,
} from "../controller/taskController.js";

//metodos get
taskRouter.get("/", getTasks);
taskRouter.get("/:id", getTask);

//metodos post
taskRouter.post("/new-task", newTask);
taskRouter.post("/update-task", updateTask);
taskRouter.post("/delete-task", deleteTask);

export default taskRouter;
