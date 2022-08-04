import express from "express";

const userRouter = express.Router();

//importamos el controller de users
import {
  deleteUser,
  getNames,
  getUsers,
  newUser,
  updateUser,
} from "../controller/userController.js";

//metodos get
userRouter.get("/", getUsers);
userRouter.get("/get-names", getNames);

//metodos post
userRouter.post("/new-user", newUser);
userRouter.post("/update-user", updateUser);
userRouter.post("/delete-user", deleteUser);

export default userRouter;
