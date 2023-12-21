import { HttpError } from "../Helpers/index.js";

export const isEmptyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, "Body must have fields"));
  }
  next();
};

export const isEmptyBodyPut = (req, res, next) => {
  const { length } = Object.keys(req.body);
  if (!length) {
    return next(HttpError(400, "missing fields"));
  }
  next();
};

console.log("object");
