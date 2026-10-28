# SnippetVault development guide

This repository contains **two implementations** of a snippet manager. Choose the entry point that matches your intended storage model.

| Mode | Entry | Storage | Accounts |
| --- | --- | --- | --- |
| Standalone | Root `index.html`, `script.js`, `style.css` | Browser localStorage | None |
| Full stack | `server/server.js` serves `public/` | MongoDB through Express | JWT signup/login |

## Standalone preview

Open the root `index.html`, or run `python3 -m http.server 8000 --bind 127.0.0.1` from the root and visit http://localhost:8000. This does not start the Express API. Data belongs to that browser/origin; it does not migrate automatically to MongoDB.

## Full-stack setup

Create root `.env`:

```dotenv
MONGODB_URI=mongodb://127.0.0.1:27017/snippetvault_demo
JWT_SECRET=replace-with-a-long-random-development-secret
PORT=3000
```

Start MongoDB, then:

```sh
npm install
npm start
```

Visit http://localhost:3000. `npm run dev` starts nodemon. The server waits for MongoDB before listening.

## API and module map

`server/routes/authRoutes.js` mounts `/signup`, `/login`, and `/me` under `/api/auth`. `server/routes/snippetRoutes.js` mounts list/create/update/delete under `/api/snippets`, with its authentication middleware applied to the router. Controllers implement requests, Mongoose models define User and Snippet, and `public/js/api.js` builds requests. Authenticated requests use a Bearer token.

## Checks and deployment

For standalone mode, create/edit/delete a snippet and check persistence after reload. For full-stack mode, create a disposable account and snippet, then verify another account cannot access it. No automated test script is declared. A static host can serve standalone mode; full-stack mode needs a Node process, MongoDB, runtime configuration, and the `public/` assets. Existing README screenshots and future-feature descriptions should not be treated as implementation evidence.

## More documentation

- [Source, command, and configuration reference](REFERENCE.md)
- [Contributing](../CONTRIBUTING.md)

## Request and storage contracts

Send JSON with `Content-Type: application/json`. Protected routes require `Authorization: Bearer <token>`.

| Method/path | Input | Success |
| --- | --- | --- |
| POST `/api/auth/signup` | `username`, `email`, `password` | 201 `{token, user: {id, username, email}}` |
| POST `/api/auth/login` | `email`, `password` | 200 with the same token/user envelope |
| GET `/api/auth/me` | Bearer token | `{user}` excluding the password |
| GET `/api/snippets` | Bearer token | `{snippets}` owned by the caller, newest first |
| POST `/api/snippets` | `title`, `code`; optional `language`, `tags` | 201 `{snippet}` |
| PUT `/api/snippets/:id` | Any provided snippet fields | `{snippet}` after ownership-scoped update |
| DELETE `/api/snippets/:id` | Owned document ID | `{message}` |

The User model requires a unique trimmed username (minimum two characters), lowercased unique email, and password of at least six characters. A pre-save hook hashes passwords with bcrypt. Tokens default to seven days; `JWT_EXPIRES_IN` overrides the duration. Snippet requires an owning User ObjectId, trimmed title, and code; language defaults to empty, tags to an empty array, and creation/update dates are stored. Saving updates `updatedAt`.

Missing signup/login fields return 400, invalid login credentials 401, duplicate signup identity 400, and absent or unowned snippet updates/deletes 404. Invalid IDs and model validation errors can reach generic 500 handlers; do not promise a uniform 400 response for every malformed input. Non-array tags become an empty array. The current update handler is partial despite using PUT.

For deployment recovery and acceptance checks, see [verification and operations](OPERATIONS.md).
