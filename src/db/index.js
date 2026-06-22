import Database from "better-sqlite3";
import { readFileSync, mkdirSync } from "node:fs";

const schema = readFileSync(new URL("./schema.sql", import.meta.url), "utf8");
const DB_PATH = "./data/exercise.db";

mkdirSync("data", { recursive: true });

const db = new Database(DB_PATH);

db.pragma("foreign_keys = ON");
db.exec(schema);

export { db };
