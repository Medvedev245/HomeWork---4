import bcrypt from "bcrypt";

import User from "../models/User.js";

import { HttpError } from "../Helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

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
    throw HttpError(401, "Email or password is wrong");
  }

  //проверяем пароль, есть ли в базе
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  // если все ок, делаем токен и отправляем
  const token = "123.4567.890";

  res.json({
    token,
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
};
