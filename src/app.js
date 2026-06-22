import express from "express";
import cors from "cors";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import usersRouter from "./routes/users.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(join(__dirname, "../public")));
app.get("/", (req, res) =>
  res.sendFile(join(__dirname, "../views/index.html")),
);

app.use("/api/users", usersRouter);
app.use(errorHandler);

export default app;
