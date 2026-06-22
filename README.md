# Exercise Tracker API

A small REST API for tracking users and their exercises. Built with Express and SQLite.

## Stack

- Node.js (ESM)
- Express
- better-sqlite3 (embedded SQLite, no external DB server needed)

## Getting started

```bash
npm install
npm start
```

The server starts on `http://localhost:3000`.

The database is created automatically on first start (`data/exercise.db`) from
`src/db/schema.sql`, so no manual setup is required after cloning.

There is also a minimal HTML front-end at `/` for manual poking, but the API is
easiest to test with curl, Postman or Insomnia.

## Project structure

The code is split into layers so each one has a single responsibility:

```
index.js                     entry point — starts the server
src/
  app.js                     builds the Express app (middleware, routes)
  db/
    index.js                 opens the SQLite connection, applies the schema
    schema.sql               tables: users, exercises
  routes/                    maps URLs to controllers
  controllers/               reads req / writes res, maps errors to HTTP status
  services/                  business rules (validation, "user exists?", etc.)
  repositories/              the only layer that talks SQL
  middleware/
    errorHandler.js          single place that turns thrown errors into JSON
```

Request flow: `route -> controller -> service -> repository -> db`.

Controllers don't know SQL, repositories don't know about HTTP. Errors are
thrown in the service with a `status` field and handled centrally in
`errorHandler`.

## API

All responses are JSON. Errors are returned as `{ "error": "..." }` with an
appropriate status code.

### Users

**POST `/api/users`** — create a user.

| field      | type   | required |
|------------|--------|----------|
| `username` | string | yes      |

`201` →
```json
{ "id": 1, "username": "alice" }
```
`400` if `username` is missing/empty, `409` if it already exists.

**GET `/api/users`** — list all users.

`200` → `[{ "id": 1, "username": "alice" }]`
`404` if there are no users.

### Exercises

**POST `/api/users/:_id/exercises`** — add an exercise for a user.

| field         | type    | required | notes                           |
|---------------|---------|----------|---------------------------------|
| `description` | string  | yes      |                                 |
| `duration`    | integer | yes      | minutes                         |
| `date`        | string  | no       | `YYYY-MM-DD`, defaults to today |

`201` →
```json
{
  "userId": 1,
  "exerciseId": 1,
  "duration": 30,
  "description": "run",
  "date": "2026-06-20"
}
```
`400` if a required field is missing/invalid, `404` if the user does not exist.

### Logs

**GET `/api/users/:_id/logs`** — full exercise log for a user.

Query parameters (all optional):

| param   | type    | notes                                 |
|---------|---------|---------------------------------------|
| `from`  | string  | `YYYY-MM-DD`, include from this date  |
| `to`    | string  | `YYYY-MM-DD`, include up to this date |
| `limit` | integer | max number of logs returned           |

`200` →
```json
{
  "id": 1,
  "username": "alice",
  "count": 3,
  "logs": [
    { "id": 1, "description": "run", "duration": 30, "date": "2026-06-10" }
  ]
}
```

`count` is the number of exercises matching the date filters **before** `limit`
is applied (useful for pagination). `404` if the user does not exist.

## Notes

- The DB file (`data/`, `*.db`) is git-ignored — it is regenerated from
  `schema.sql` on start.
- SQLite foreign keys are enabled explicitly (`PRAGMA foreign_keys = ON`).
