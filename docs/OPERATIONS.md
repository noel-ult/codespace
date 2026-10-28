# codespace: verification and operations

Reviewed against [default-branch commit ee93b30869d5](https://github.com/noel-ult/codespace/commit/ee93b30869d54147a806d7eec616b8d38aaffbb3) on 2026-10-28. Start with the [developer guide](PROJECT_GUIDE.md) for installation and architecture, and the [source reference](REFERENCE.md) for exact scripts, configuration readers, routes, and source locations.

## SnippetVault and Render recovery

In full-stack mode, create two disposable accounts and verify snippet create/update/delete and isolation between them. Test browser standalone persistence separately; its localStorage records do not migrate to MongoDB.

These are acceptance scenarios for a maintainer to run in the documented environment. Their inclusion is not a claim that live integrations or production credentials were tested during this documentation update.

## Deployment and failure diagnosis

The observed Render log reported querySrv ENOTFOUND for the configured MongoDB SRV host. The server exits on database failure before listening, producing the later no-open-port timeout. Check the Atlas cluster status and current hostname, update MONGODB_URI through Render environment settings, then redeploy and verify a database-backed request. The code already consumes PORT. The provided failure log does not establish that the database has since been restored.

## Maintaining the contract

When behavior changes, update the guide and examples in the same PR. Check the entry point and working directory before copying commands. Use the linked source readers to distinguish build-time configuration from process environment. For failures, capture the first application error, runtime version, selected mode, and redacted configuration names before later proxy or port errors.

Keep changes tied to evidence: a declared command is not proof it passes, a process health response is not a successful end-to-end workflow, and a historical report describes its own revision. Record actual check results and any unavailable external services in the PR.
