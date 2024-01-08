import express from "express";
import contactsController from "../../controllers/contacts-controller.js";
// import isValidId from "../../middlewares/isValidId.js";
import {
  isEmptyBody,
  isEmptyBodyPatch,
  isEmptyBodyPut,
} from "../../middlewares/isEmptyBody.js";

import { isValidId } from "../../middlewares/isValidId.js";

// import { validateBody } from "../../decorators/index.js";

import { contactUpdateFavoriteShema } from "../../models/Contact.js";
import { authenticate } from "../../middlewares/authenticate.js";

const contactsRouter = express.Router(authenticate);

contactsRouter.use();

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
  // contactUpdateFavoriteShema,
  contactsController.updateById
);

// обновление по АйДи / Какое поле надо обновить
contactsRouter.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBodyPatch,
  contactsController.updateById
);

contactsRouter.delete("/:contactId", isValidId, contactsController.deleteById);

export default contactsRouter;
