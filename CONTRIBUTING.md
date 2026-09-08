# Contributing to Election Insight Canada

Thank you for your interest in contributing.

## Before You Begin

For bug fixes and small documentation improvements, a pull request is welcome.

For new features or substantial architectural changes, please open an issue
first so the proposed approach can be discussed.

Review the [development roadmap](docs/roadmap.md) for current priorities.

## Development Setup

Follow the [local setup instructions](README.md#️-local-setup).

## Development Workflow

1. Fork and clone the repository.
2. Create a branch from `main`.
3. Make a focused change.
4. Add or update relevant tests.
5. Run the backend and frontend test suites.
6. Submit a pull request describing the change and how it was tested.

Example branch names:

- `feature/riding-results-table`
- `fix/swing-margin-filter`
- `docs/improve-local-setup`

## Testing

Run backend tests:

```bash
yarn backend:test
```

Run frontend unit tests:

```bash
yarn frontend:test
```

Run end-to-end tests:

```bash
yarn frontend:test:e2e
```

## Code Conventions

- Use snake case for PostgreSQL columns, Python names and API DTO properties.
- Use camel case for ordinary TypeScript variables and functions.
- Keep API DTO property names aligned with the API response.
- Use color rather than colour in source-code identifiers.
- Parameterize SQL values rather than interpolating user input.
- Add tests for new calculations, validation rules and user-facing behaviour.
- Keep pull requests focused on one feature or concern.

## Data

Raw Elections Canada files are not committed to the repository.

Use the documented download command to obtain the required dataset locally. Do not commit generated data, database credentials, .env files or coverage output.

## Pull Requests

A pull request should explain:

- what changed;
- why the change is needed;
- how it was tested;
- whether it changes the API or database schema;
- screenshots for visible frontend changes.

All existing tests should pass before review.
