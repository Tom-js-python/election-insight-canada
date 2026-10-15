# Contributing to Election Insight Canada

Thank you for your interest in contributing.

## Before You Begin

For bug fixes and small documentation improvements, a pull request is welcome.

For new features or substantial architectural changes, please open an issue
first so the proposed approach can be discussed.

Review the [development roadmap](docs/roadmap.md) for current priorities.

## Development Setup

Follow the Local Setup section in the [project README](README.md).

## Development Workflow

1. Fork and clone the repository.
2. Update `main` and create a focused branch.

```bash
git switch main
git pull --ff-only
git switch -c feature/descriptive-branch-name
```

1. Make the change in small, understandable commits.
2. Add or update relevant tests and documentation.
3. Run `yarn precommit`.
4. Review any formatting or linting changes made by that command.
5. Push the branch and submit a pull request describing the change and how it was tested.

Example branch names:

- `feature/riding-results-table`
- `fix/swing-margin-filter`
- `docs/improve-local-setup`

## Testing and Quality Checks

Run the complete pre-commit checks. The linting and formatting commands may modify files. Review those changes before committing.

```bash
yarn precommit
```

Individual suites can also be run separately:

```bash
yarn frontend:test
yarn backend:test
yarn frontend:type-check
yarn backend:type-check
```

## Code Conventions

- Use `snake_case` for PostgreSQL columns, Python names and API DTO properties.
- Use `camelCase` for frontend application-model properties, variables and functions.
- Keep TypeScript API DTOs in `snake_case` so they match the backend response exactly.
- Convert API DTOs into frontend application models through explicit mapper functions.
- Preserve the established Pydantic response contracts unless an API change is intentional.
- Include accessible names, semantic HTML and keyboard behaviour in frontend changes.
- Avoid unrelated formatting or refactoring in a focused pull request.

## Data

Raw Elections Canada files are not committed to the repository.

Follow the download instructions in the project README to obtain the required dataset locally. Do not commit generated data, database credentials, .env files or coverage output. Do not commit local environment files or secrets. Only sanitized example or test environment files explicitly permitted by `.gitignore` should be tracked.

## Pull Requests

A pull request should explain:

- what changed;
- why the change is needed;
- how it was tested;
- whether it changes the API or database schema;
- screenshots for visible frontend changes;
- documentation updates when setup, commands or behaviour change;
- migration or database-recreation instructions for schema changes.

All applicable checks should pass before the pull request is submitted. If a check is intentionally deferred or cannot be run, explain why in the pull-request description.
