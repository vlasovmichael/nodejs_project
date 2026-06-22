import {
  createUser,
  findAllUsers,
  findUserById,
  findUserByUsername,
} from "../repositories/users.repo.js";

export function registerUser(username) {
  if (!username || typeof username !== "string" || username.trim() === "") {
    const err = new Error("username is required");
    err.status = 400;
    throw err;
  }
  if (findUserByUsername(username)) {
    const err = new Error("username already taken");
    err.status = 409;
    throw err;
  }
  return createUser(username);
}

export function getAllUsers() {
  return findAllUsers();
}

export function getUserById(id) {
  if (!id || typeof id !== "number") {
    const err = new Error("id is required and must be a number");
    err.status = 400;
    throw err;
  }
  const user = findUserById(id);
  if (!user) {
    const err = new Error("user not found");
    err.status = 404;
    throw err;
  }
  return user;
}

export function getUserByUsername(username) {
  if (!username || typeof username !== "string" || username.trim() === "") {
    const err = new Error("username is required");
    err.status = 400;
    throw err;
  }
  const user = findUserByUsername(username);
  if (!user) {
    const err = new Error("user not found");
    err.status = 404;
    throw err;
  }
  return user;
}
