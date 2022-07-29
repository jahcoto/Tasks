import express from "express";

const userRouter = express.Router();

//importamos el controller de status
import {
  //deleteStatus,
  //getName,
  getStatus,
  //newStatus,
  //updateStatus,
} from "../controller/statusController.js";

//metodos get
userRouter.get("/", getStatus);
//userRouter.get("/get-name", getName);

//metodos post
//userRouter.post("/new-status", newStatus);
//userRouter.post("/update-status", updateStatus);
//userRouter.post("/delete-status", deleteStatus);

export default userRouter;
