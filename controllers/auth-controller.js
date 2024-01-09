import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User.js";

import { HttpError } from "../Helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

import { JWT_SECRET } from "../config.js";
// console.log("1", JWT_SECRET);

//registration
const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashPassword });
  console.log(newUser);

  res.status(201).json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

//avtorization
const signin = async (req, res) => {
  const { email, password } = req.body;

  //смотрим есть ли пользователь с таким мейлом
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong(mail)");
  }

  //проверяем пароль, есть ли в базе
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong(pass)");
  }

  // если все ок, делаем токен и отправляем
  const { _id: id } = user;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const GetCurrent = async (req, res) => {
  const { subscription, email } = req.user;

  console.log(req.user);
  res.json({
    subscription,
    email,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content",
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  GetCurrent: ctrlWrapper(GetCurrent),
  signout: ctrlWrapper(signout),
};
