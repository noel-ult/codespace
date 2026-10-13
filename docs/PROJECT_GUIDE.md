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
