import { registerUser, getAllUsers } from "../services/users.service.js";

export function createUser(req, res, next) {
  try {
    const { username } = req.body;
    const user = registerUser(username);

    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export function getUsers(req, res, next) {
  try {
    const users = getAllUsers();

    if (users.length === 0) {
      const err = new Error("no users found");
      err.status = 404;
      throw err;
    }
    res.json(users);
  } catch (err) {
    next(err);
  }
}
