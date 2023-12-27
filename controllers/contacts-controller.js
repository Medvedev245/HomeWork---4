// import {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContactById,
// } from "../models/contacts/index.js";
import { HttpError } from "../Helpers/index.js";
import Contact from "../models/Contact.js";

import { contactAddSchema, contactUpdateSchema } from "../models/Contact.js";

const getAll = async (req, res, next) => {
  try {
    const result = await Contact.find();

    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    /*
    console.log(req.params); достучаться
    до ключа - contactId: 'vza2RIzNGIwutCVCs4mCL'
  */
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    console.log(result);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    return res.json(result);
  } catch (error) {
    //next(error) - ищет мидлвару с 4 параметрами
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

// const updateById = async (req, res, next) => {
//   try {
//     const { error } = contactUpdateSchema.validate(req.body);
//     if (error) {
//       throw HttpError(404, "Not found");
//     }
//     const { contactId } = req.params;

//     const result = await updateContactById(contactId, req.body);
//     if (!result) {
//       throw HttpError(404, `Not found`);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// const deleteById = async (req, res, next) => {
//   try {
//     const { contactId } = req.params;
//     const result = await removeContact(contactId);
//     if (!result) {
//       throw HttpError(404, `Not found`);
//     }
//     res.json({
//       message: "contact deleted",
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export default {
  getAll,
  getById,
  add,
  // updateById,
  // deleteById,
};
