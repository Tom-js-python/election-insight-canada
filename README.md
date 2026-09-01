# 🇨🇦 Election Insight Canada

A full-stack data application for exploring Canadian federal election results, built with Python, FastAPI, PostgreSQL, Vue and TypeScript.

The project's first phase transforms Elections Canada's poll-by-poll election data into a normalized relational database and exposes riding-level results through a REST API. Future phases will add interactive visualizations and polling-based seat projections.

**Current focus:** Backend API complete for initial 2025 riding analysis; Vue/TypeScript frontend in development.

![License](https://img.shields.io/badge/license-Apache%202.0-blue)
![Frontend](https://img.shields.io/badge/frontend-Vue%203-green)
![Backend](https://img.shields.io/badge/backend-FastAPI-lightgreen)
![Database](https://img.shields.io/badge/database-PostgreSQL-blue)

---

## 🧩 The Problem

### 🗳️ 1. Estimating seat counts from polling data

Canada uses a **first-past-the-post** electoral system with multiple parties and 338 individual ridings. Translating national polling percentages into seat counts is not straightforward.

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

- Data is split across many files
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
  - Swing ridings (close races)

---

### 🔮 Planned Features (Future Phases)

- Seat projections based on national polling data
- Interactive vote share sliders
- Real-time seat projection updates
- Interactive map visualization
- Historical election comparisons
- Filtering by party, province, and riding

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
- **Frontend (planned)**: Vue 3
- **Styling (planned)**: Tailwind CSS
- **Testing:** pytest

---

## 🗺️ Roadmap

### 📌 Data & Backend

- [x] Download and analyze Elections Canada CSV data
- [x] Design normalized PostgreSQL schema
- [x] Build database and tables
- [x] Load 2025 general election data

### 🔌 FastAPI Endpoints

- [x] Endpoint: results by riding
- [x] Endpoint: swing ridings
- [ ] Expand queries for deeper analysis

### 🖥️ Frontend

- [ ] Scaffold Vue frontend
- [ ] Display tabular election data
- [ ] Build interactive map visualization
- [ ] Add filters (party, province, riding)

### 📈 Forecasting

- [ ] Design seat projection model
- [ ] Implement backend projection logic
- [ ] Add interactive polling sliders
- [ ] Visualize projected seat distributions

### 🕰️ Historical Data

- [ ] Load past elections into database
- [ ] Handle boundary and naming changes
- [ ] Enable historical comparisons

---

## 🚧 Current Status

The backend and 2025 election data pipeline are functional. Current development
is focused on building the first Vue frontend for exploring the API data.

### Completed

- PostgreSQL database schema
- 2025 Elections Canada data ingestion pipeline
- Riding-level election results API
- Swing-riding analysis API
- Backend automated test suite

### In Progress

- Vue 3 / TypeScript frontend
- Filterable riding-results tables

### Planned

- Interactive election map
- Historical election data
- Polling-based seat projection model

---

## 🛠️ Local Setup

Instructions for running the project locally will be added as development progresses.

### 📋 Prerequisites

- Python 3.x
- PostgreSQL
- Node.js
- Yarn
- uv

### 1. Clone the repository

````text
git clone https://github.com/Tom-js-python/election-insight-canada
```

### 2. Configure PostgreSQL

Run 'psql postgres' at the terminal

In the psql terminal type:

```text
SHOW PORT;
CREATE DATABASE election_insight_canada;
CREATE ROLE eic_computer_access
    WITH LOGIN
    ENCRYPTED PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE election_insight_canada TO eic_computer_access;
ALTER ROLE "eic_computer_access" WITH LOGIN;
\connect election_insight_canada;
GRANT ALL ON SCHEMA public TO eic_computer_access;
exit
````

### 3. Configure environment variables

Copy the \_env_start file in the backend directory to .env and modify parameters as needed inserting the port PostgreSQL is running on, and your password

```text
cp ./backend/_env_start ./backend/.env
```

### 4. Create the database tables

```text
yarn db:create-tables
```

### 5. Download Elections Canada data

```text
Save and unzip the data at: https://elections.ca/content.aspx?section=res&dir=rep/off/45gedata&document=bypro&lang=e to the data/raw directory
```

### 6. Load the data

```text
yarn db:load-2025-csv
```

### 7. Start the API

```text
yarn run backend:start
```

### 8. Run the tests

```text
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
when the backend is running locally.

---

## 🧪 Testing

The backend includes an automated pytest test suite covering API routes,
database-related application logic, and response validation.

Run the backend tests with:

yarn run backend:test

---

## 👋 Creator

Built and maintained by **Tom Brown**

---

## 📄 License

This project is open source under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

You are free to use, modify, and distribute it under the terms of the license.
