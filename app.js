import express from "express"; // работа с апи
import logger from "morgan"; //красиво логировать запрос
import cors from "cors"; // ошибка корс

import authRouter from "./routes/api/auth-router.js";
import contactsRouter from "./routes/api/contacts-router.js";

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
// если прийдет любой запрос /api/contacts - ищи его в обьекте contactsRouter

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

export default app;

// import express from "express";
// import logger from "morgan";
// import cors from "cors";
