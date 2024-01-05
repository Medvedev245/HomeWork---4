import User from "../models/User.js";

import { HttpError } from "../Helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const signup = async (req, res) => {
  const newUser = await User.create(req.body);

  res.json({
    username: newUser.username,
    email: newUser.email,
  });
};

export default {
  signup: ctrlWrapper(signup),
};
