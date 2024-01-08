import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config.js";

import { HttpError } from "../Helpers/index.js";

import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "bearer") {
    return next(HttpError(401, "Not authorized"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = User.findById(id);
    if (!user) {
      return next(HttpError((401, "User not found")));
    }
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};
