# Development Roadmap

This roadmap describes the planned development of Election Insight Canada.
Priorities may change as the application is tested and new election datasets
are introduced.

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

## Current Phase

### Extend the riding-results contract

- [ ] Add failing tests for candidate vote shares, outcomes and margins
- [ ] Use Elections Canada's elected-candidate indicator to identify winners
- [ ] Add `vote_share`, `outcome`, `margin_votes`, and
      `margin_percentage_points` to candidate results
- [ ] Rename the nested `results` field to `candidate_results`
- [ ] Allow swing ridings to be filtered by either vote margin or
      percentage-point margin
- [ ] Validate that exactly one margin filter is supplied
- [ ] Extract the SQL shared by the all-ridings and swing-ridings queries
- [ ] Update API documentation and existing tests

### Improve local setup

- [ ] Add a PostgreSQL setup file
- [ ] Automate downloading and extracting the Elections Canada dataset
- [ ] Add dependency-installation commands to the setup documentation
- [ ] Test the documented process from a fresh clone
- [ ] Evaluate a repeatable local setup script

## Next Phase

### Initial Vue results interface

- [x] Scaffold the Vue 3 and TypeScript frontend
- [x] Create the application header and primary navigation
- [ ] Complete the Vitest configuration
- [ ] Define TypeScript interfaces matching the API response
- [ ] Add representative mock election data
- [ ] Build the responsive riding-results table
- [ ] Add loading, empty and error states
- [ ] Connect the frontend to `/ridings/all/2025`
- [ ] Configure CORS for local frontend development
- [ ] Add client-side filtering by riding, party, outcome and margin
- [ ] Add sortable vote-count, vote-share and margin columns
- [ ] Add table pagination
- [ ] Add focused Vitest and Playwright coverage

### Initial deployment

- [ ] Containerize the application with Docker
- [ ] Define a reproducible local environment with Docker Compose
- [ ] Deploy the application and 2025 data to the existing Linode server
- [ ] Configure Nginx and HTTPS
- [ ] Add a basic CI pipeline for tests and production builds
- [ ] Document deployment and operational procedures

## Later Phases

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

- [ ] Migrate from psycopg2 to psycopg 3
- [ ] Profile SQL queries and add appropriate indexes
- [ ] Evaluate caching for repeated analytical queries
- [ ] Add server-side pagination for polling-division data
- [ ] Evaluate asynchronous database access under concurrent load
- [ ] Add automated dependency and security checks
- [ ] Expand accessibility and responsive-device testing
