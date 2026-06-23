import {
  createExercise,
  findExercisesByUserId,
  countExercisesByUserId,
} from "../repositories/exercises.repo.js";
import { findUserById } from "../repositories/users.repo.js";

export function addExercise(userId, { description, duration, date }) {
  if (!userId || typeof userId !== "number") {
    const err = new Error("userId is required and must be a number");
    err.status = 400;
    throw err;
  }

  if (typeof description !== "string" || description.trim() === "") {
    const err = new Error("description is required");
    err.status = 400;
    throw err;
  }
  const cleanDescription = description.trim();
  const durationNum = Number(duration);
  if (!Number.isInteger(durationNum) || durationNum <= 0) {
    const err = new Error(
      "duration is required and must be a positive integer",
    );
    err.status = 400;
    throw err;
  }
  if (date && isNaN(Date.parse(date))) {
    const err = new Error("date must be a valid date string");
    err.status = 400;
    throw err;
  }
  const user = findUserById(userId);
  if (!user) {
    const err = new Error("user not found");
    err.status = 404;
    throw err;
  }
  const exerciseDate = date
    ? new Date(date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];

  return createExercise(userId, cleanDescription, durationNum, exerciseDate);
}

export function getUserLogs(userId, { from, to, limit }) {
  const user = findUserById(userId);
  if (!user) {
    const err = new Error("user not found");
    err.status = 404;
    throw err;
  }

  let limitNum;
  if (limit !== undefined) {
    limitNum = Number(limit);
    if (!Number.isInteger(limitNum) || limitNum <= 0) {
      const err = new Error("limit must be a positive integer");
      err.status = 400;
      throw err;
    }
  }

  const count = countExercisesByUserId(userId, { from, to });
  const logs = findExercisesByUserId(userId, { from, to, limit: limitNum });

  return { id: user.id, username: user.username, count, logs };
}
