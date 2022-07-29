import express from "express";

const userRouter = express.Router();

//importamos el controller de users
import {
  deleteUser,
  getEmails,
  getUsers,
  newUser,
  updateUser,
} from "../controller/userController.js";

//metodos get
userRouter.get("/", getUsers);
userRouter.get("/getEmails", getEmails);

//metodos post
userRouter.post("/new-user", newUser);
userRouter.post("/update-user", updateUser);
userRouter.post("/delete-user", deleteUser);

export default userRouter;
