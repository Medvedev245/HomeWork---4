import express from "express";
import contactsController from "../../controllers/contacts-controller.js";

import { isEmptyBody, isEmptyBodyPut } from "../../middlewares/isEmptyBody.js";

const contactsRouter = express.Router();

//функция контроллер сама функция в controllers
contactsRouter.get("/", contactsController.getAll);

// Все что после : Динамический маршрут - находится в req.params
contactsRouter.get("/:contactId", contactsController.getById);

//isEmptyBody - мидлвара проверяет пустой или нет?
contactsRouter.post("/", isEmptyBody, contactsController.add);

//
// contactsRouter.put(
//   "/:contactId",
//   isEmptyBodyPut,
//   contactsController.updateById
// );

// contactsRouter.delete("/:contactId", contactsController.deleteById);

export default contactsRouter;
