# Baha Auto Spares

React + Redux frontend with a Rails (API-only) backend on PostgreSQL for searching and reviewing auto parts inventory.

## Project layout
- `backend/` – Rails 8 API skeleton (`.ruby-version` is 3.4.1, Postgres)
- `frontend/` – Vite + React + Redux Toolkit UI with inventory search flow

## Prerequisites
- Ruby 3.4.1 (matches `backend/.ruby-version`)
- Node.js 20.19+ (older 20.x works but shows engine warnings)
- PostgreSQL running locally

## Backend (API) setup
1) `cd backend`
2) Ensure you are using Ruby 3.4.1 (e.g., via `~/.local/share/mise/installs/ruby/3.4.1/bin/ruby` or your Ruby manager)
3) `bundle install`
4) Configure `config/database.yml` credentials if needed
5) `rails db:create db:migrate`
6) Run: `bin/rails server`

## Frontend setup
1) `cd frontend`
2) `npm install`
3) `npm run dev`
4) Open the dev server URL (default `http://localhost:5173`)

## Current UI flow
- Landing page with a prominent “Search Parts” CTA.
- Inventory page: form with Select Year, Select Make/Model, Select Part, and a Search button.
- Results page: shows matched parts (currently mocked) with availability and pricing placeholders.

The Redux slice that drives the inventory form and results lives at `frontend/src/features/search/searchSlice.js`. Replace the mock search in `searchParts` with a real API call once the Rails endpoints are ready.
