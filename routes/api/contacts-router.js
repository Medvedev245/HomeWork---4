import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
// import isValidId from "../../middlewares/isValidId.js";
import { isEmptyBody, isEmptyBodyPut } from "../../middlewares/isEmptyBody.js";
import { isValidId } from "../../middlewares/isValidId.js";

const contactsRouter = express.Router();

//функция контроллер сама функция в controllers
contactsRouter.get("/", contactsController.getAll);

// Все что после : Динамический маршрут - находится в req.params
contactsRouter.get("/:contactId", isValidId, contactsController.getById);

//isEmptyBody - мидлвара проверяет пустой или нет?
contactsRouter.post("/", isEmptyBody, contactsController.add);

//
contactsRouter.put(
  "/:contactId",
  isValidId,
  isEmptyBodyPut,
  contactsController.updateById
);

// contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);

export default contactsRouter;
