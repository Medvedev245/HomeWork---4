import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../config.js";

import { HttpError } from "../Helpers/index.js";

import User from "../models/User.js";

export const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized-1"));
  }
  const [bearer, token] = authorization.split(" ");
  if (bearer === "bearer") {
    return next(HttpError(401, "Not authorized-2"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user) {
      return next(HttpError((401, "User not found")));
    }
    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized-3"));
  }
};
