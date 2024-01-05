import User from "../models/User.js";

import { HttpError } from "../Helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const signup = async (req, res) => {
  console.log("1");
  const newUser = await User.create(req.body);
  console.log(newUser);

  res.json({
    email: newUser.email,
    password: newUser.password,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
