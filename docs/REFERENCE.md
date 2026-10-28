# codespace source reference

Source reviewed: [`ee93b30869d5`](https://github.com/noel-ult/codespace/commit/ee93b30869d54147a806d7eec616b8d38aaffbb3).

This reference records the checked-in source, scripts, configuration names, and route declarations. It is a navigation aid; service availability and successful test execution require separate verification.

## Package commands

Run each command in the directory containing its package manifest. A declared script is not necessarily a passing check; guides call out placeholders and known mismatches.

### package.json

| Script | Shell command |
| --- | --- |
| `start` | `node server/server.js` |
| `dev` | `nodemon server/server.js` |

Manifest: [package.json](../package.json).

## Configuration names

Names below are declared by source or example files. Example-only entries may be stale; consult the linked reader and project guide before relying on them. Secret values are intentionally omitted.

| Name | Declared/read in |
| --- | --- |
| `JWT_EXPIRES_IN` | [server/controllers/authController.js](../server/controllers/authController.js) |
| `JWT_SECRET` | [server/controllers/authController.js](../server/controllers/authController.js), [server/middleware/auth.js](../server/middleware/auth.js) |
| `MONGODB_URI` | [server/config/db.js](../server/config/db.js) |
| `PORT` | [server/server.js](../server/server.js) |

## HTTP route declarations

Paths are **as declared in each source file**. Router/blueprint mount prefixes from the entry point must be prepended; the project guide describes the active entry point and common prefixes. Alternate entry points (such as SQLite) are listed separately by file. Authentication, request bodies, and response schemas live in the linked handlers/models.

| Source | Method | Declared path | Handler |
| --- | --- | --- | --- |
| [server/routes/authRoutes.js](../server/routes/authRoutes.js) | POST | `/signup` | `` |
| [server/routes/authRoutes.js](../server/routes/authRoutes.js) | POST | `/login` | `` |
| [server/routes/authRoutes.js](../server/routes/authRoutes.js) | GET | `/me` | `` |
| [server/routes/snippetRoutes.js](../server/routes/snippetRoutes.js) | GET | `/` | `` |
| [server/routes/snippetRoutes.js](../server/routes/snippetRoutes.js) | POST | `/` | `` |
| [server/routes/snippetRoutes.js](../server/routes/snippetRoutes.js) | PUT | `/:id` | `` |
| [server/routes/snippetRoutes.js](../server/routes/snippetRoutes.js) | DELETE | `/:id` | `` |
| [server/server.js](../server/server.js) | GET | `*` | `` |

## Existing documentation

Historical plans/reports describe their own revision; use current source when they disagree.

- [CONTRIBUTING.md](../CONTRIBUTING.md)
- [README.md](../README.md)
- [docs/PROJECT_GUIDE.md](../docs/PROJECT_GUIDE.md)
- [docs/REFERENCE.md](../docs/REFERENCE.md)

## Source and configuration map

Generated lockfiles, binary assets, compiled output, vendored dependencies, and cached bytecode are omitted. Test files remain listed so coverage can be located.

- [index.html](../index.html)
- [package.json](../package.json)
- [public/css/style.css](../public/css/style.css)
- [public/index.html](../public/index.html)
- [public/js/api.js](../public/js/api.js)
- [public/js/app.js](../public/js/app.js)
- [public/js/auth.js](../public/js/auth.js)
- [public/login.html](../public/login.html)
- [public/signup.html](../public/signup.html)
- [script.js](../script.js)
- [server/config/db.js](../server/config/db.js)
- [server/controllers/authController.js](../server/controllers/authController.js)
- [server/controllers/snippetController.js](../server/controllers/snippetController.js)
- [server/middleware/auth.js](../server/middleware/auth.js)
- [server/models/Snippet.js](../server/models/Snippet.js)
- [server/models/User.js](../server/models/User.js)
- [server/routes/authRoutes.js](../server/routes/authRoutes.js)
- [server/routes/snippetRoutes.js](../server/routes/snippetRoutes.js)
- [server/server.js](../server/server.js)
- [style.css](../style.css)
