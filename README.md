# SnippetVault

A code-snippet manager with two checked-in implementations:

| Mode | Entry point | Persistence |
| --- | --- | --- |
| Standalone browser app | Root `index.html` | localStorage |
| Express application with accounts | `npm start`, serving `public/` | MongoDB |

The standalone version needs no backend. The full-stack version requires `MONGODB_URI` and `JWT_SECRET`, then serves JWT-protected snippet routes. Data is not shared automatically between the two modes.

- [Developer guide: choose a mode, configure, run, and verify](docs/PROJECT_GUIDE.md)
- [Source, command, configuration, and route reference](docs/REFERENCE.md)
- [Contributing](CONTRIBUTING.md)

The browser interface uses HTML, CSS, and JavaScript. See [LICENSE](LICENSE) for the existing MIT license.

<!-- developer-handbook-20261028 -->
[Developer guide](docs/PROJECT_GUIDE.md) · [Source reference](docs/REFERENCE.md) · [Verification and operations](docs/OPERATIONS.md)
<!-- /developer-handbook-20261028 -->
