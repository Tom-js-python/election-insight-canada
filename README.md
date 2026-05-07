# 🇨🇦 Election Insight Canada

A data-driven web application for exploring Canadian federal election results and estimating seat outcomes from polling data.

This project aims to make Canadian election data more accessible, understandable, and interactive through a combination of data processing, APIs, and visualizations.

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

This project transforms raw election data into a structured, queryable format.

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
│   ├── db/
│   │   └── schema.sql
│   ├── scripts/
│   ├── tests/
│   └── requirements.txt
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

---

## 🗺️ Roadmap

### 📌 Data & Backend

- [x] Download and analyze Elections Canada CSV data
- [x] Design normalized PostgreSQL schema
- [x] Build database and tables
- [x] Load 2025 general election data

### 🔌 API

- [ ] Endpoint: results by riding
- [ ] Endpoint: swing ridings
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

🛠️ Early development — actively building core data pipeline.

- Data ingestion groundwork complete
- Database schema designed
- Next step: load 2025 election data into PostgreSQL

---

## 🛠️ Local Setup (Coming Soon)

Instructions for running the project locally will be added as development progresses.

### 📋 Prerequisites

- Python 3
- Node.js
- Yarn
- uv

### Build PostgreSQL initial database

Run 'psql postgres' at the terminal

In the psql terminal type:

```text
SHOW PORT;
CREATE DATABASE election_insight_canada;
CREATE ROLE eic_computer_access WITH ENCRYPTED PASSWORD (enter password here in quotes);
GRANT ALL PRIVILEGES ON DATABASE election_insight_canada TO eic_computer_access;
ALTER ROLE "eic_computer_access" WITH LOGIN;
\connect election_insight_canada;
GRANT ALL ON SCHEMA public TO eic_computer_access;
exit
```

Copy the .env.development file in the backend directory to .env and modify parameters as needed inserting the port PostgreSQL is running on, and your password

```text
cp ./backend/.env.development ./backend/.env
```

Create the database tables

```text
yarn db:create-tables
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

## 👋 Creator

Built and maintained by **Tom Brown**

---

## 📄 License

This project is open source under the [Apache 2.0 License](https://www.apache.org/licenses/LICENSE-2.0).

You are free to use, modify, and distribute it under the terms of the license.
