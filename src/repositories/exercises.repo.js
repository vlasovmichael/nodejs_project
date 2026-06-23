import { db } from "../db/index.js";

export function createExercise(userId, description, duration, date) {
  const result = db
    .prepare(
      "INSERT INTO exercises (user_id, description, duration, date) VALUES (?, ?, ?, ?)",
    )
    .run(userId, description, duration, date);
  return { id: result.lastInsertRowid, userId, description, duration, date };
}

export function findExercisesByUserId(userId, { from, to, limit } = {}) {
  let sql =
    "SELECT id, description, duration, date FROM exercises WHERE user_id = ?";
  const params = [userId];

  if (from) {
    sql += " AND date >= ?";
    params.push(from);
  }
  if (to) {
    sql += " AND date <= ?";
    params.push(to);
  }

  sql += " ORDER BY date ASC";

  if (limit) {
    sql += " LIMIT ?";
    params.push(limit);
  }

  return db.prepare(sql).all(...params);
}

export function countExercisesByUserId(userId, { from, to } = {}) {
  let sql = "SELECT COUNT(*) as count FROM exercises WHERE user_id = ?";
  const params = [userId];

  if (from) {
    sql += " AND date >= ?";
    params.push(from);
  }
  if (to) {
    sql += " AND date <= ?";
    params.push(to);
  }

  const result = db.prepare(sql).get(...params);
  return result.count;
}
