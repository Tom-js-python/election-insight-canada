# 🇨🇦 Election Insight Canada

A full-stack data application for exploring Canadian federal election results, built with Python, FastAPI, PostgreSQL, Vue and TypeScript.

The project's first phase, now complete, transforms Elections Canada's poll-by-poll election data into a normalized relational database and exposes riding-level results through a REST API. The current phase in progress is displaying this data in a tabular format on the front-end. Future phases will add interactive visualizations and polling-based seat projections.

**Current focus:** Backend API complete for initial 2025 riding analysis; Vue/TypeScript frontend in development.

![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Frontend](https://img.shields.io/badge/frontend-Vue%203-green)
![Backend](https://img.shields.io/badge/backend-FastAPI-lightgreen)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)

---

## 🧩 The Problem

### 🗳️ 1. Estimating seat counts from polling data

Canada uses a **first-past-the-post** electoral system with multiple parties and 343 individual ridings. Translating national polling percentages into seat counts is not straightforward.

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

### 📊 2. Working with Elections Canada data

Elections Canada provides detailed CSV datasets, but they are difficult to work with directly.

Common challenges:

- Data is split across many files (one file for each of the 343 ridings)
- Significant redundancy within and across datasets
- Hard to answer simple analytical questions (e.g., “Which ridings were decided by fewer than 300 votes?”)
- When combined, the number of rows of data for just the 2025 election is 476,685, making it hard to analyze in Excel

This project transforms raw election data into a structured, queryable format.

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

---

## 🚀 What This Project Does

### 🧠 Core Capabilities (Current / Phase 1)

- Ingests official Elections Canada CSV data
- Stores data in a normalized PostgreSQL database
- Provides structured access via a FastAPI backend
- Enables queries such as:
  - Results by riding
  - Candidate vote breakdowns
  - Identifying swing ridings (close races)

---

### 🔮 Planned Features (Future Phases)

- Seat projections based on national polling data
- Interactive vote share sliders
- Real-time seat projection updates
- Interactive map visualization
- Historical election comparisons
- Filtering by party, province, and riding

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
│   └── processed/
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── router/
│   │   ├── stores/
│   │   ├── types/
│   │   └── views/
│   └── package.json
│
├── docs/
│   ├── elections-canada-data-dictionary.md
│   └── todo.md
│
├── README.md
└── .gitignore
```

## 🛠️ Tech Stack

- **Backend**: Python, FastAPI
- **Database**: PostgreSQL
- **Data Source**: Elections Canada CSV datasets
- **Frontend (in progress)**: Vue 3
- **Styling (in progress)**: Tailwind CSS
- **Backend Testing**: pytest
- **Frontend Testing (in progress)**: vitest and playwright

---

## 🗺️ Development Roadmap

The 2025 election data pipeline and initial FastAPI backend are complete.
Current development is focused on extending the riding-results API contract
and building a responsive Vue interface.

### Current priorities

- Add candidate vote shares, outcomes and victory margins to API responses
- Share common SQL logic between riding-results endpoints
- Build the first filterable and sortable Vue results table
- Improve and automate local development setup

### Later phases

- Deploy the application to Linode
- Add an interactive riding map
- Support historical elections and by-elections
- Develop and backtest polling-based seat-projection models

See the [detailed development roadmap](docs/roadmap.md) for planned work and
current progress.

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

### 2. Install the depdencies

```bash
yarn run install
```

### 3. Configure PostgreSQL

Run 'psql postgres' at the terminal

In the psql terminal type:

```sql
SHOW PORT;
CREATE DATABASE election_insight_canada;
CREATE ROLE eic_computer_access
    WITH LOGIN
    ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE election_insight_canada TO eic_computer_access;
ALTER ROLE "eic_computer_access" WITH LOGIN;
\connect election_insight_canada;
GRANT ALL ON SCHEMA public TO eic_computer_access;
\q
```

### 4. Configure environment variables

Copy the \_env_start file in the backend directory to .env and modify parameters as needed inserting the port PostgreSQL is running on, and your password

```bash
cp ./backend/_env_start ./backend/.env
```

### 5. Create the database tables

```bash
yarn db:create-tables
```

### 6. Download Elections Canada data

Go to <https://elections.ca/content.aspx?section=res&dir=rep/off/45gedata&document=bypro&lang=e>. Download the data for Canada / poll-by-poll results, format 2, to the the data/raw directory. Unzip this file.

### 7. Load the data

```bash
yarn db:load-2025-csv
```

### 8. Start the API

```bash
yarn run backend:start
```

### 9. Run the tests

```bash
yarn run backend:test
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

---

## 🔌 API

The FastAPI backend currently provides endpoints for exploring the 2025
Canadian federal election.

### Riding Results

GET /ridings/all/2025

Returns election results for Canadian federal electoral districts, including
candidate and party vote totals.

### Swing Ridings

GET /ridings/swing/2025

Returns ridings ordered/filterable by victory margin, allowing close races
to be identified for later swing analysis.

Interactive API documentation is available through FastAPI's Swagger UI
at <http://localhost:8000/docs> when the backend is running locally.

---

## 🧪 Testing

The backend includes an automated pytest test suite covering API routes,
database-related application logic, and response validation.

Run the backend tests with:

yarn run backend:test

The frontend tests are currently under development, using the TDD methodology.

---

## 👋 Creator

Built and maintained by **Tom Brown**

---

## 🤝 Contributing

Contributions, bug reports and implementation suggestions are welcome.

Before beginning a substantial change, please open an issue so the proposed approach can be discussed. Development conventions, testing commands and the pull-request process are documented in [CONTRIBUTING.md](CONTRIBUTING.md).

Issues suitable for new contributors are labelled `good first issue`.

---

## 📄 License

This project is open source under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

You are free to use, modify, and distribute it under the terms of the license.
