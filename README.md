# 🇨🇦 Election Insight Canada

A full-stack data application for exploring Canadian federal election results, built with Python, FastAPI, PostgreSQL, Vue and TypeScript.

The initial PostgreSQL ETL pipeline and FastAPI backend are complete. The Vue frontend now loads 2025 riding results and political-party data through a tested API client and Pinia store. Client-side filtering, sorting and pagination is complete, and the basic site is up and running on a public-facing server.

The site is currently live at [Election Insight Canada](https://www.electioninsightcanada.ca/).

**Current focus:** Post-launch testing, usability improvements and broader device testing.

![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Frontend](https://img.shields.io/badge/frontend-Vue%203-green)
![Backend](https://img.shields.io/badge/backend-FastAPI-lightgreen)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)

---

## 🧩 The Problem

### 📊 1. Working with Elections Canada data

Elections Canada provides detailed CSV datasets, but they are difficult to work with directly.

Common challenges:

- Data is split across many files (one file for each of the 343 ridings)
- Significant redundancy within and across datasets
- Hard to answer simple analytical questions (e.g., “Which ridings were decided by fewer than 300 votes?”)
- When combined, the number of rows of data for just the 2025 election is 476,685, making manual exploration cumbersome

This project transforms raw election data into a structured, queryable format.

Election data is sourced from Elections Canada. This is an independent portfolio project and is not affiliated with or endorsed by Elections Canada. The software license does not replace any terms applicable to the source data.

### 🗳️ 2. Estimating seat counts from polling data

Canada uses a **first-past-the-post** electoral system with multiple parties. The 2025 federal election was contested across 343 individual ridings, and translating national polling percentages into seat counts is not straightforward.

Key challenges include:

- **Regional concentration of support**  
  Parties like the _Bloc Québécois_ can win many seats with relatively low national vote share.

- **Vote splitting**  
  Parties competing for similar voters (e.g., Liberal vs NDP, Conservative vs PPC) can significantly affect outcomes.

- **Close races (swing ridings)**  
  Many ridings are decided by small margins, where even minor vote shifts can change the winner.

- **Regional dynamics**  
  Voting patterns vary significantly across provinces (Prairies, Ontario, Quebec, Atlantic Canada).

Because of these factors, national polling results do **not directly translate** into seat projections.

---

## ⚙️ Technical Highlights

- Built a REST API with Python and FastAPI for querying Canadian federal election results
- Designed a normalized PostgreSQL schema for Elections Canada election data
- Built Python data-loading tools to transform and load 2025 poll-by-poll election results into PostgreSQL
- Developed analytical SQL queries using joins, CTEs, aggregate functions, and window functions
- Created API endpoints for riding-level election results and identifying close ("swing") ridings
- Defined structured API response models using Pydantic
- Built automated backend tests with pytest
- Used environment-based configuration for database credentials and development settings
- Built a typed frontend API client with structured error handling and request cancellation
- Added explicit API-to-application mappers and TypeScript data models
- Integrated FastAPI data with a Pinia store and Vue components
- Added loading and error states, request cancellation, and store-level support for retrying failed requests.
- Configured CORS for local frontend development
- Added frontend component, API-client, mapper and store tests with Vitest and Vue Testing Library
- Precomputed riding-level results in a PostgreSQL materialized view to avoid repeating aggregations for every API request

---

## 🚀 What This Project Does

### 🧠 Core Capabilities (Current / Phase 1)

- Ingests official Elections Canada CSV data.
- Stores data in a normalized PostgreSQL database.
- Provides structured access via a FastAPI backend.
- Enables exploration of all 343 ridings from the 2025 election.
- Supports searching by riding name or district number.
- Compares winner and selected-party results.
- Filters close races by outcome and vote or percentage-point margin.
- Supports sorting and pagination.

---

### 🔮 Planned Features (Future Phases)

- Seat projections based on national polling data
- Interactive vote share sliders
- Instant seat-projection updates as vote assumptions change
- Interactive map visualization
- Historical election comparisons
- Filtering by province

Development priorities and planned features are tracked in the [detailed roadmap](docs/roadmap.md).

---

## 🏗️ Project Structure

```text
election-insight-canada/
│
├── backend/
│   ├── app/
│   ├── common/
│   ├── db/
│   │   ├── queries/
│   │   └── schema.sql
│   ├── loaders/
│   ├── scripts/
│   ├── tests/
│   └── pyproject.toml
│
├── data/
│   ├── raw/
│   ├── reference/
│   └── processed/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── mappers/
│   │   ├── mocks/
│   │   ├── router/
│   │   ├── stores/
│   │   ├── types/
│   │   ├── views/
│   │   ├── App.vue
│   │   └── main.ts
│   └── package.json
│
├── docs/
│   ├── elections-canada-data-dictionary.md
│   ├── requirements.md
│   └── roadmap.md
│
├── README.md
├── LICENSE
├── CONTRIBUTING.md
├── package.json
├── yarn.lock
└── .gitignore
```

## 🛠️ Tech Stack

- **Frontend:** Vue 3, TypeScript, Pinia and Vue Router
- **Styling:** Tailwind CSS 3
- **Backend:** Python and FastAPI
- **Database:** PostgreSQL
- **Backend testing:** pytest and Coverage.py
- **Frontend testing:** Vitest, Vue Testing Library and jsdom
- **End-to-end testing:** Playwright (configured; tests pending)
- **Package and environment tools:** Yarn and uv

---

## 🗺️ Development Roadmap

The 2025 election data pipeline and initial FastAPI backend are complete.
The interactive riding-results table is implemented. Current development focuses on post-launch testing, usability improvements and testing across devices.

### Current priorities

- Post-launch testing, usability improvements and broader device testing.

### Later phases

- Add an interactive riding map
- Support historical elections and by-elections
- Develop and backtest polling-based seat-projection models

See the [detailed development roadmap](docs/roadmap.md) for planned work and current progress.

---

## 🛠️ Local Setup

The following instructions set up the current development version locally. The setup process is still being improved and has primarily been tested on macOS.

### 📋 Prerequisites

For the backend and data pipeline:

- PostgreSQL
- Python 3.13 or higher
- uv

For the Vue frontend:

- Node.js
- Yarn

### 1. Clone the repository

```bash
git clone https://github.com/Tom-js-python/election-insight-canada
cd election-insight-canada
```

### 2. Install the dependencies

```bash
yarn setup
```

### 3. Configure PostgreSQL

Connect to PostgreSQL using an administrative role. Depending on your installation, this may be:

```bash
psql -U postgres -d postgres
```

In the psql terminal type:

```sql
SHOW PORT;
CREATE DATABASE election_insight_canada;
CREATE ROLE eic_computer_access WITH LOGIN;
\password eic_computer_access

\connect election_insight_canada
GRANT ALL ON SCHEMA public TO eic_computer_access;
\q
```

### 4. Configure environment variables

Copy the example environment files and update the values for your local environment.

```bash
cp ./backend/.env.example ./backend/.env
cp ./frontend/.env.example ./frontend/.env.development
```

Configure the backend database connection values in `backend/.env`.

Configure the frontend API location in `frontend/.env.development`:

```env
VITE_API_BASE_URL=http://localhost:8000
```

### 5. Create the database tables

**Warning**: This command drops and recreates the application tables, deleting existing data. Run it only for initial setup or an intentional database rebuild.

```bash
yarn db:create-tables
```

### 6. Download Elections Canada data

Go to <https://elections.ca/content.aspx?section=res&dir=rep/off/45gedata&document=bypro&lang=e>. Download the data for Canada / poll-by-poll results, format 2, to the data/raw directory. Unzip this file.

### 7. Load the data

```bash
yarn db:load-2025-csv
```

### 8. Build the materialized view for the 2025 election

```bash
yarn db:build-view-2025
```

### 9. Run the development server

```bash
yarn dev
```

Once both development servers are running, the application is available locally at:

- Vue frontend: <http://localhost:5173>
- FastAPI documentation: <http://localhost:8000/docs>
- Health endpoint: <http://localhost:8000/health>

### 10. Run the tests, type checks, linting and formatting before committing

```bash
yarn precommit
```

---

## 🧠 Why This Project?

This project sits at the intersection of:

- **Software development**
- **Data analysis**
- **Public policy**

With a background in both programming and public administration, I’m interested in building tools that make complex real-world systems more understandable.

Canadian elections are a great example: simple on the surface, but deeply complex in practice.

---

## 📚 Documentation

- [Development roadmap](docs/roadmap.md)
- [Elections Canada data dictionary](docs/elections-canada-data-dictionary.md)
- [API documentation](http://localhost:8000/docs) — available while the backend is running
- [Contributing guide](CONTRIBUTING.md)
- [Detailed Requirements](docs/requirements.md)

---

## 🔌 API

The FastAPI backend currently provides endpoints for exploring the 2025 Canadian federal election.

### Riding Results

`GET /ridings/all/2025`

Returns election results for Canadian federal electoral districts, including candidate and party vote totals.

### Political Parties

`GET /political-parties`

Returns canonical political-party data, including stable keys and English and French source, long-display and short-display names, as well as English and French abbreviations.

### Swing Ridings

`GET /ridings/swing/2025`

Returns close races for a selected political party.

Required query parameters:

- `party_key`: the stable key identifying the political party;
- `outcome`: one of `win`, `loss` or `both`;
- exactly one of:
  - `max_margin_votes`;
  - `max_margin_percentage_points`.

Example:

```http
GET /ridings/swing/2025?party_key=conservative&outcome=win&max_margin_votes=1000
```

Interactive API documentation is available through FastAPI's Swagger UI at <http://localhost:8000/docs> when the backend is running locally.

---

## 🧪 Testing

The backend includes an automated pytest suite covering API routes, request validation, response structure and shared application logic. More comprehensive ETL integration testing is planned.

Run the backend tests with:

```bash
yarn backend:test
```

The frontend includes an automated Vitest unit test suite. Significant parts of the frontend tests have been deferred, however.

Run the frontend tests with:

```bash
yarn frontend:test
```

End-to-end testing with Playwright is configured, but the tests have not yet been implemented.

---

## 👋 Creator

Built and maintained by **Tom Brown**

- [GitHub](https://github.com/Tom-js-python)
- [LinkedIn](https://www.linkedin.com/in/thomas-brown-823364326/)

---

## 🤝 Contributing

Contributions, bug reports and implementation suggestions are welcome.

Before beginning a substantial change, please open an issue so the proposed approach can be discussed. Development conventions, testing commands and the pull-request process are documented in [CONTRIBUTING.md](CONTRIBUTING.md).

---

## 📄 License

This project is open source under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

You are free to use, modify, and distribute it under the terms of the license.
