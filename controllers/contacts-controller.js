// import {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContactById,
// } from "../models/contacts/index.js";
import { HttpError } from "../Helpers/index.js";
import Contact from "../models/Contact.js";
import { ctrlWrapper } from "../decorators/index.js";

import {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteShema,
} from "../models/Contact.js";

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getById = async (req, res) => {
  /*
    console.log(req.params); достучаться
    до ключа - contactId: 'vza2RIzNGIwutCVCs4mCL'
  */
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  return res.json(result);
};

const add = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { error } = contactUpdateSchema.validate(req.body);
  if (error) {
    console.log(error);
    throw HttpError(404, "Not found");
  }
  const { contactId } = req.params;
  console.log(contactId);
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
    runValidators: true,
  });
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({
    message: "contact deleted",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
