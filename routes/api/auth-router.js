// группа маршрутов на авторизацию и регистрацию
import express from "express";

import authController from "../../controllers/auth-controller.js";

import { isValidId } from "../../middlewares/isValidId.js";

import {
  isEmptyBody,
  isEmptyBodyPatch,
  isEmptyBodyPut,
} from "../../middlewares/isEmptyBody.js";

import { validateBody } from "../../decorators/index.js";

import { userSigninShema, userSignupShema } from "../../models/User.js";

const authRouter = express.Router();

authRouter.post(
  "/",
  isEmptyBody,
  validateBody(userSignupShema),
  authController.signup
);

export default authRouter;

// import contactsController from "../../controllers/contacts-controller.js";

// import {
//   isEmptyBody,
//   isEmptyBodyPatch,
//   isEmptyBodyPut,
// } from "../../middlewares/isEmptyBody.js";
// import { isValidId } from "../../middlewares/isValidId.js";
