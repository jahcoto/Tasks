import express from "express"; //Se importa express

const statusRouter = express.Router(); //Se declara el router de Status

//importamos el controller de status
import {
  //deleteStatus,
  getName,
  getStatus,
  newStatus,
  updateStatus,
  deleteStatus,
} from "../controller/statusController.js";

//metodos get
statusRouter.get("/", getStatus);
statusRouter.get("/get-names", getName);

//metodos post
statusRouter.post("/new-status", newStatus);
statusRouter.post("/update-status", updateStatus);
statusRouter.post("/delete-status", deleteStatus);

export default statusRouter;
