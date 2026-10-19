# The ChatShack

The ChatShack is a Cardiff-based mental health support charity. This repo
holds the whole live site: a React/Vite frontend and a Django backend.

- **Live site**: https://chatshack.app
- **Backend API / admin**: https://api.chatshack.app (admin login at
  `/admin/`)

## What's in this repo

- `src/` — the public site itself (React 19 + Vite + TypeScript + React
  Router v7, Tailwind v4). This is what visitors see at chatshack.app.
- `backend/` — the Django + DRF backend that powers the admin, the site's
  content, and all the on-site forms. See **[backend/README.md](backend/README.md)**
  for everything about how it's built, deployed, and run locally.
- `docs/` — the built output of `src/`, published via GitHub Pages (this
  folder is generated, not hand-edited).

## Running the frontend locally

```bash
npm install
npm run dev
```

For the backend, see [backend/README.md](backend/README.md).

## Deploying

```bash
git add -A
git commit -m "..."
git push                                        # publishes the frontend via GitHub Pages
git subtree push --prefix backend heroku main   # deploys the backend to Heroku
```

Run both from the repo root (this folder), not from inside `backend/`.
