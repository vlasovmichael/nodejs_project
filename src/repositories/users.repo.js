import { db } from "../db/index.js";

export function createUser(username) {
  const result = db
    .prepare("INSERT INTO users (username) VALUES (?)")
    .run(username);
  return { id: result.lastInsertRowid, username };
}

export function findAllUsers() {
  const users = db.prepare("SELECT id, username FROM users").all();
  return users;
}

export function findUserById(id) {
  const user = db
    .prepare("SELECT id, username FROM users WHERE id = ?")
    .get(id);
  return user;
}

export function findUserByUsername(username) {
  const user = db
    .prepare("SELECT id, username FROM users WHERE username = ?")
    .get(username);
  return user;
}
