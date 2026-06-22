import { Router } from "express";
import { createUser, getUsers } from "../controllers/users.controller.js";
import {
  createExercise,
  getLogs,
} from "../controllers/exercises.controller.js";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.post("/:_id/exercises", createExercise);
router.get("/:_id/logs", getLogs);

export default router;
