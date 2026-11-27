# Deployment and Operations

This document describes the current manual deployment process for Election Insight Canada.

## Deployment overview

The application runs on an Ubuntu Linode server.

- Nginx serves the production Vue frontend over HTTPS.
- Requests beginning with `/api/` are forwarded to FastAPI.
- FastAPI runs as a systemd service and connects to PostgreSQL locally.
- Riding results are retrieved from a PostgreSQL materialized view.

The frontend is built on the developer's machine. Node.js and Yarn are not required on the production server.

### Application locations

| Component           | Location                                         |
| ------------------- | ------------------------------------------------ |
| Repository          | `/home/tom/apps/election-insight-canada`         |
| Backend             | `/home/tom/apps/election-insight-canada/backend` |
| Published frontend  | `/var/www/electioninsightcanada`                 |
| Backend service     | `election-insight-api.service`                   |
| Backend address     | `127.0.0.1:8000`                                 |
| Public API prefix   | `/api/`                                          |
| Production database | `election_insight_canada`                        |

The public application is available at <https://electioninsightcanada.ca>.

## Server prerequisites

The server requires:

- PostgreSQL
- Git
- uv and the Python version supported by the project
- Nginx
- unzip
- wget or curl
- Certbot and its Cloudflare DNS plugin

The server uses SSH-key authentication, disabled password and root SSH login, UFW, and a Linode firewall.

Ports 8000 and 5432 must not be publicly exposed. FastAPI and PostgreSQL communicate locally.

Credentials, private keys and API tokens must not be committed to Git.

## Initial backend setup

These steps initialize a new installation. They are not required for routine application updates.

### Clone the repository

Run as the `tom` user:

```bash
mkdir -p /home/tom/apps
cd /home/tom/apps

git clone https://github.com/Tom-js-python/election-insight-canada.git

cd election-insight-canada/backend
uv sync --locked
```

Keep the repository outside the Nginx web root. Only the built frontend files belong in the public web directory.

### Create the database and application role

Open PostgreSQL as its administrative operating-system user:

```bash
sudo -u postgres psql
```

Create the database and application role:

```sql
CREATE DATABASE election_insight_canada;
CREATE ROLE eic_computer_access WITH LOGIN;
\password eic_computer_access

\connect election_insight_canada
GRANT ALL ON SCHEMA public TO eic_computer_access;

\q
```

Use a strong, unique password. Do not run the application using the PostgreSQL superuser.

### Configure backend environment variables

Create `backend/.env` with the production settings:

```dotenv
DB_HOST=127.0.0.1
DB_PORT=5432
DB_NAME=election_insight_canada
DB_USER=eic_computer_access
DB_PASSWORD=REPLACE_WITH_A_SECRET
CORS_ORIGINS=
```

Restrict access to the file:

```bash
chmod 600 .env
```

The backend currently loads `.env`; it does not automatically select `.env.production`.

The production frontend uses same-origin `/api/` requests, so no cross-origin frontend permission is required. An empty `CORS_ORIGINS` value is parsed as an empty allowlist.

### Create the application tables

> **Warning:** This command drops and recreates the application tables, deleting existing application data. Use it only for initial setup or an intentional database rebuild.

From the backend directory:

```bash
uv run -m scripts.create_tables
```

### Download and extract election data

Download the official 2025 poll-by-poll dataset into the location expected by the loader:

```bash
cd /home/tom/apps/election-insight-canada/data/raw

wget 'https://elections.ca/res/rep/off/ovrGE45/62/data_donnees/pollresults_resultatsbureauCanada.zip'

unzip pollresults_resultatsbureauCanada.zip
```

Verify that the extracted files match the directory structure expected by the loader. The ZIP can be deleted after successful extraction.

### Load data and build the materialized view

From the backend directory, run the data-loading and materialized-view modules referenced by these root-level scripts:

- `db:load-2025-csv`
- `db:build-view-2025`

Use their equivalent `uv run -m scripts.<module_name>` commands on the server, where Node.js and Yarn are not installed.

Run them in this order:

1. Load the 2025 CSV data.
2. Build `calculated_results_2025`.

The materialized view must be refreshed when its underlying data changes, or rebuilt when its definition changes.

## FastAPI managed service

The application service is defined in:

```text
/etc/systemd/system/election-insight-api.service
```

Its configuration is:

```ini
[Unit]
Description=Election Insight Canada API
After=network.target postgresql.service

[Service]
Type=simple
User=tom
Group=tom
WorkingDirectory=/home/tom/apps/election-insight-canada/backend
ExecStart=/home/tom/apps/election-insight-canada/backend/.venv/bin/python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --workers 1
Restart=on-failure
RestartSec=5
Environment=PYTHONUNBUFFERED=1
NoNewPrivileges=true
PrivateTmp=true
UMask=0077

[Install]
WantedBy=multi-user.target
```

The service:

- Runs as `tom`, not root.
- Uses the virtual environment created by uv.
- Listens only on the local loopback address.
- Uses one Uvicorn worker.
- Does not enable development auto-reloading.
- Restarts after a failure.

### Enable and start the service

After creating or changing the service file:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now election-insight-api
```

Do not leave a manually started Uvicorn process running on port 8000 when starting the service.

### Service-management commands

Check status:

```bash
sudo systemctl status election-insight-api --no-pager
```

Restart:

```bash
sudo systemctl restart election-insight-api
```

Stop:

```bash
sudo systemctl stop election-insight-api
```

View recent logs:

```bash
sudo journalctl -u election-insight-api -n 100 --no-pager
```

Follow logs:

```bash
sudo journalctl -u election-insight-api -f
```

Test FastAPI directly:

```bash
curl -i http://127.0.0.1:8000/health
```

## Nginx and HTTPS

Nginx redirects HTTP requests to HTTPS, serves the frontend files and forwards API requests to FastAPI.

The site configuration follows this structure:

```nginx
server {
    listen 80;
    listen [::]:80;

    server_name electioninsightcanada.ca www.electioninsightcanada.ca;

    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;

    server_name electioninsightcanada.ca www.electioninsightcanada.ca;

    include /etc/nginx/ssl/ssl_electioninsightcanada.ca.conf;
    include /etc/nginx/ssl/ssl_all_sites.conf;

    root /var/www/electioninsightcanada;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:8000/;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

The trailing slash on `proxy_pass` removes the `/api/` prefix. For example, `/api/health` reaches FastAPI as `/health`.

The frontend fallback to `index.html` supports direct navigation and browser refreshes on Vue Router paths such as `/about`.

### Apply configuration changes

Validate the configuration:

```bash
sudo nginx -t
```

Only if validation succeeds, reload Nginx:

```bash
sudo systemctl reload nginx
```

HSTS and origin HTTP/3 are currently deferred.

### Certificates and renewal

Certificates are obtained using Certbot's Cloudflare DNS plugin.

The Cloudflare credentials file is stored at:

```text
/root/.cf_tokens/cloudflare.ini
```

It must remain private and available for certificate renewal. Do not place its contents in this repository.

The certificate covers:

- `electioninsightcanada.ca`
- `*.electioninsightcanada.ca`

Certbot's renewal timer checks periodically whether renewal is needed.

Check the timer:

```bash
systemctl list-timers --all | grep certbot
```

Test renewal:

```bash
sudo certbot renew --dry-run
```

A deploy hook reloads Nginx after successful renewal:

```text
/etc/letsencrypt/renewal-hooks/deploy/reload-nginx
```

Its contents are:

```sh
#!/bin/sh
/usr/sbin/nginx -t && /usr/bin/systemctl reload nginx
```

The hook must be executable.

## Deploying frontend updates

### Build locally

Set the production API location in `frontend/.env.production`:

```dotenv
VITE_API_BASE_URL=/api
```

From the project root:

```bash
yarn frontend:build
```

Vite embeds production environment values during the build. Changing them requires another build.

Never place secrets in frontend environment variables.

### Upload the build

From the local machine, create the staging directory if necessary:

```bash
ssh tws 'mkdir -p /home/tom/eic-dist'
```

Upload the contents of `dist`:

```bash
scp -r frontend/dist/. tws:eic-dist/
```

The `tws` SSH alias is developer-specific. Other operators should substitute their configured SSH host.

### Publish the files

Connect to the server:

```bash
ssh tws
```

Copy the files into the Nginx web directory:

```bash
sudo cp -r /home/tom/eic-dist/. /var/www/electioninsightcanada/
```

No Nginx reload is required for static-file updates.

This manual copy process does not remove obsolete build assets. A release-directory or automated deployment process may replace it later.

## Deploying backend updates

Develop and test changes locally, merge them into `main`, and then update the production checkout.

On the server:

```bash
cd /home/tom/apps/election-insight-canada
git status
```

Proceed only when the working tree is clean and there are no unexplained server-side changes:

```bash
git pull --ff-only origin main

cd backend
uv sync --locked

sudo systemctl restart election-insight-api
```

Record the deployed commit:

```bash
git rev-parse HEAD
```

Verify the service and public health endpoint after updating.

### Database changes

Schema or reference-data changes require a separate deployment plan.

- Back up the database before making changes.
- Apply the required migration or intentional rebuild.
- Refresh or rebuild the materialized view as appropriate.
- Verify API results afterward.

Do not rerun the destructive create-tables script as part of routine code deployment.

## Deployment verification

After deployment, verify:

- HTTP redirects to HTTPS.
- HTTPS works for both the root domain and `www`.
- The health endpoint returns `200 OK`.
- Political-party and riding endpoints return data.
- The all-ridings response contains 343 ridings.
- Search works by district number and riding name.
- Search is accent-insensitive.
- Party selection updates the results.
- Swing filters work with vote and percentage-point margins.
- Sorting works in both directions.
- Pagination and first/previous/next/last controls work.
- Reset restores the default controls.
- About-page navigation and direct refresh work.
- External links open as intended.
- Favicons display correctly.

Public health check:

```bash
curl -f https://electioninsightcanada.ca/api/health
```

## Backups and recovery

**Status: Pending implementation and restore testing.**

The database can currently be rebuilt from the source dataset and project scripts. Nevertheless, off-server backups are planned to reduce recovery time.

The backup procedure should document:

- Backup commands and frequency.
- Off-server storage.
- Backup retention.
- Restoration into a separate test database.
- Recreation of database roles and permissions.
- Recovery of environment configuration, Nginx configuration and the systemd service.

Database dumps do not include every part of the server configuration. Secrets must be backed up securely and must not be committed to Git.

Do not describe recovery as verified until a restore has been tested.

## Troubleshooting

| Symptom                           | First checks                                                              |
| --------------------------------- | ------------------------------------------------------------------------- |
| `502 Bad Gateway`                 | Check the FastAPI service status and journal                              |
| API returns `500`                 | Check application logs, database connectivity and the materialized view   |
| `/about` returns `404` on refresh | Check the Nginx fallback to `index.html`                                  |
| Port 8000 is already in use       | Check for a manually started Uvicorn process                              |
| Frontend calls `localhost:8000`   | Check production environment settings and rebuild the frontend            |
| Changes are not visible           | Check the uploaded build location and browser cache                       |
| Certificate renewal fails         | Check the Certbot logs, Cloudflare token and credentials-file permissions |
