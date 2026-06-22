import { db } from "../db/index.js";

export function createExercise(userId, description, duration, date) {
  const result = db
    .prepare(
      "INSERT INTO exercises (user_id, description, duration, date) VALUES (?, ?, ?, ?)",
    )
    .run(userId, description, duration, date);
  return { id: result.lastInsertRowid, userId, description, duration, date };
}

export function findExercisesByUserId(userId) {
  const exercises = db
    .prepare(
      "SELECT id, description, duration, date FROM exercises WHERE user_id = ?",
    )
    .all(userId);
  return exercises;
}
