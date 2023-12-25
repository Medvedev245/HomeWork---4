import { Schema, model } from "mongoose";
//создаем магус схему и модель
const contactSchema = new Schema({
  name: String,
  email: String,
  phone: String,
});

const Contact = model("contact", contactSchema);

export default Movie;
