import { addExercise, getUserLogs } from "../services/exercises.service.js";

export function createExercise(req, res, next) {
  try {
    const userId = Number(req.params._id);
    const created = addExercise(userId, req.body);

    res.status(201).json({
      userId: created.userId,
      exerciseId: created.id,
      duration: created.duration,
      description: created.description,
      date: created.date,
    });
  } catch (err) {
    next(err);
  }
}

export function getLogs(req, res, next) {
  try {
    const userId = Number(req.params._id);
    const result = getUserLogs(userId, req.query);

    res.json(result);
  } catch (err) {
    next(err);
  }
}
