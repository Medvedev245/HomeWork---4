import { isValidObjectId } from "mongoose";

import { HttpError } from "../Helpers/index.js";

export const isValidId = (req, res, next) => {
  if (!isValidObjectId(contactId)) {
    return next(HttpError(404, `${contactId} not valid`));
  }
  next();
};
