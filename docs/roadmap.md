# Development Roadmap

This roadmap describes the planned development of Election Insight Canada.
Priorities may change as the application is tested and new election datasets
are introduced. **Last updated: October 2026**

## Completed

### Data pipeline and database

- [x] Analyze Elections Canada poll-by-poll CSV data
- [x] Build tools for reading electoral-district CSV files
- [x] Design a normalized PostgreSQL schema
- [x] Create the database tables
- [x] Build the 2025 general-election ingestion pipeline
- [x] Load the 2025 election data into PostgreSQL

### FastAPI backend

- [x] Build the 2025 riding-results endpoint
- [x] Build the swing-ridings endpoint
- [x] Add Pydantic request and response models
- [x] Add pytest coverage for the initial API
- [x] Add environment-based database configuration

### Project documentation

- [x] Document the project purpose, architecture and current capabilities
- [x] Document the initial local-development setup

### Canonical political-party data

- [x] Add curated political-party reference data
- [x] Use a stable `party_key` as the primary key
- [x] Store English and French source, long-display and short-display names
- [x] Update candidate records to reference `party_key`
- [x] Load the static party data during ETL
- [x] Raise an error when Elections Canada data contains an unmapped party
- [x] Add a utility for discovering party names in new election datasets
- [x] Build and test the political-parties endpoint

### Extend the riding-results contract

- [x] Add failing tests for candidate vote shares, outcomes and margins
- [x] Use Elections Canada's elected-candidate indicator to identify winners
- [x] Add `vote_share`, `outcome`, `margin_votes`, `party_key` and
      `margin_percentage_points` to candidate results
- [x] Allow swing ridings to be filtered by either vote margin or
      percentage-point margin
- [x] Validate that exactly one margin filter is supplied
- [x] Extract the SQL shared by the all-ridings and swing-ridings queries
- [x] Update API documentation and existing tests

### Frontend integration

- [x] Scaffold the Vue 3 and TypeScript frontend
- [x] Create the application header and primary navigation
- [x] Complete the Vitest configuration
- [x] Define TypeScript interfaces matching the API response
- [x] Add representative mock election data
- [x] Build the responsive riding-results table
- [x] Add a visible loading state
- [x] Connect the frontend to `/ridings/all/2025`
- [x] Configure CORS for local frontend development
- [x] Build a typed API client with structured error handling
- [x] Add API-to-application data mappers
- [x] Add political-party and riding-result API services
- [x] Add a Pinia store for election data
- [x] Add request cancellation with `AbortController`
- [x] Add store state for loading and errors
- [x] Add Vitest coverage for components, API services, mappers and store behaviour
- [x] Load political parties and results for all 343 ridings through Pinia

### Improve development workflow

- [x] Add dependency-installation commands to the setup documentation
- [x] Add a root command for installing project dependencies
- [x] Add a root command for running the frontend and backend together
- [x] Add a root pre-commit command for formatting, linting, type checking and tests
- [x] Document the development commands

## Current Phase

### Complete the interactive riding-results table

- [x] Write the detailed requirements document to refine the results-page layout and user experience
- [ ] Add abbreviation_english and abbreviation_french to backend political party table
- [ ] Add inactive Summary to navigation bar
- [ ] Add filter, sort, and pagination types and defaults to Pinia
- [ ] Connect filter controls to Pinia state without filtering yet
- [ ] Remove 'View' column for now - comment out code
- [ ] Modify Riding header to be Riding Name, and add District Number header
- [ ] Implement the all-parties and selected-party table layouts
- [ ] Implement riding search
- [ ] Add the results-mode toggle and the border and title around swing-riding controls
- [ ] Implement swing-riding filtering
- [ ] Implement sorting
- [ ] Implement pagination (right now five per page - not final)
- [ ] Add empty-results displays
- [ ] Add error displays
- [ ] Complete interaction and accessibility tests

### Prepare for initial deployment

- [ ] Replace the About-page stub with a project overview and public profile links
- [ ] Create a project logo and favicon
- [ ] Verify production environment-variable handling
- [ ] Restrict production CORS origins
- [ ] Verify that all pre-commit checks pass for the initial release
- [ ] Perform a production build and local smoke test

### Initial deployment

- [ ] Deploy the frontend, backend and 2025 data to the existing Linode server
- [ ] Configure the FastAPI application as a managed service
- [ ] Configure Nginx as a reverse proxy and static-file server
- [ ] Configure HTTPS
- [ ] Configure production database access and backups
- [ ] Verify the deployed health, API and frontend routes
- [ ] Document deployment and operational procedures

## Later Phases

### Improve application layout

- [ ] Add a spam-protected contact form to the About page
- [ ] Add basic SEO
- [ ] Build page to view riding details
- [ ] Add the Election Summary Requirements page
- [ ] Add the View riding column back and implement the page

### Improve testing

- [ ] Add comprehensive unit and integration tests for the backend ETL process
- [ ] Add Playwright end-to-end tests

### Improve local setup

- [ ] Add a PostgreSQL setup file
- [ ] Automate downloading and extracting the Elections Canada dataset
- [ ] Test the documented process from a fresh clone
- [ ] Evaluate a repeatable local setup script
- [ ] Containerize the application with Docker
- [ ] Define a reproducible local environment with Docker Compose
- [ ] Add a basic CI pipeline for tests and production builds

### Interactive election map

- [ ] Obtain and document official riding-boundary data
- [ ] Evaluate an appropriate mapping library
- [ ] Display 2025 riding boundaries coloured by winning party
- [ ] Connect table filters and riding selections to the map
- [ ] Evaluate PostGIS if server-side spatial queries become necessary

### Historical elections and by-elections

- [ ] Automate loading additional Elections Canada datasets
- [ ] Extend API routes to select an election
- [ ] Handle riding-boundary and naming changes between elections
- [ ] Add election selection to the tables and map
- [ ] Add by-election support

### Seat projection model

- [ ] Implement a documented baseline national-swing model
- [ ] Add regional vote adjustments
- [ ] Backtest projections against historical elections
- [ ] Model projection uncertainty
- [ ] Evaluate whether more advanced statistical or machine-learning
      approaches improve accuracy
- [ ] Add national and regional vote-share controls
- [ ] Display projected seat totals and riding changes

## Engineering Improvements

These will be prioritized using profiling, testing and observed application
requirements.

- [ ] Evaluate migration from psycopg2 to psycopg3
- [ ] Profile SQL queries and add appropriate indexes
- [ ] Evaluate caching for repeated analytical queries
- [ ] Add server-side pagination for polling-division data
- [ ] Evaluate asynchronous database access under concurrent load
- [ ] Add automated dependency and security checks
- [ ] Expand accessibility and responsive-device testing
