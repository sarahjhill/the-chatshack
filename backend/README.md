# The ChatShack - Django backend

This is a separate backend alongside the React/Vite site in `../` (the
public site itself is untouched - how it looks and works for visitors
hasn't changed). This backend gives you:

- **A proper admin** (`/admin/`) where you can edit the homepage content,
  site-wide contact details, see every form submission, and manage
  volunteering events/shifts.
- **Storage for every form on the site**: Community page suggestions, the
  Support page's First Contact form, and Partners & Resources applications
  all save to the database and show up in the admin.
- **Email notifications**: you (at the `NOTIFY_EMAIL` address, currently
  your enquiries address) get emailed whenever someone submits a form or
  signs up for a volunteer shift.
- **A volunteer events/shifts system**: create an Event, add Shifts to it,
  and volunteers can sign up for a shift until it's full - you get emailed
  each time.
- **A JSON API** (`/api/...`) that the React site can call instead of
  reading the static `public/content/home.json` file, so editing content
  in the admin actually changes the live site.

## What's NOT done yet

The React site still reads `public/content/home.json` directly - it isn't
calling this new API yet, and none of the three forms (suggestions, first
contact, partner applications) submit to it yet either. That's a separate,
small follow-up once you're happy with this backend and it's deployed
somewhere real - purely wiring, no visual changes.

## Running it locally

```bash
cd backend
source venv/bin/activate        # the venv is already set up
cp .env.example .env            # first time only
python manage.py migrate        # first time only / after pulling new migrations
python manage.py createsuperuser  # first time only - choose your own username/password
python manage.py runserver
```

Then open http://127.0.0.1:8000/admin/ and log in with the superuser you
created. The homepage content and site settings are already pre-filled
with your real current content (seeded from `home.json`).

API endpoints to try:
- `GET /api/home/` - homepage content as JSON
- `GET /api/settings/` - contact details
- `GET /api/events/` - published upcoming events + shifts
- `POST /api/suggestions/`, `/api/first-contact/`, `/api/partner-applications/` - form submissions
- `POST /api/shifts/<id>/signup/` - volunteer shift sign-up

## Deploying - steps only you can do

I can't register a domain or create cloud accounts on your behalf (that
needs your own login and payment/identity details), so here's exactly
what to do yourself. Ask me for help with any step if something doesn't
match what you see.

### 1. Get your free domain (GitHub Student Developer Pack)

1. Go to https://education.github.com/pack (sign in with your GitHub
   student account).
2. Find **Name.com** in the pack and redeem the offer - it covers several
   extensions including `.app`, `.dev`, `.live`, `.studio`.
3. Search for your preferred domain (you mentioned `chatshack.app`) - if
   it's taken, good alternatives under the same free offer are
   `thechatshack.app`, `chatshack.dev` or `thechatshack.dev`.
4. Register it through the student offer so it's free for the first year
   (note: it reverts to Name.com's normal renewal price after year one).

### 2. Create the Heroku app (using your student credits)

```bash
heroku login
cd backend
heroku create thechatshack-api        # or whatever name you like - this becomes thechatshack-api.herokuapp.com
heroku addons:create heroku-postgresql:essential-0
```

Set the config vars (replace the placeholder values):

```bash
heroku config:set DJANGO_SECRET_KEY="$(python -c 'import secrets; print(secrets.token_urlsafe(50))')"
heroku config:set DEBUG=False
heroku config:set DJANGO_ALLOWED_HOSTS="thechatshack-api.herokuapp.com,api.chatshack.app"
heroku config:set CORS_ALLOWED_ORIGINS="https://chatshack.app,https://www.chatshack.app"
heroku config:set NOTIFY_EMAIL="enquiries.the.chatshack01@gmail.com"
```

(Email sending also needs `EMAIL_HOST`/`EMAIL_HOST_USER`/`EMAIL_HOST_PASSWORD`
config vars once you've picked a provider - e.g. SendGrid has a free tier
and Heroku has an add-on for it. Until then, notification emails just
won't send, but everything still saves to the database and the admin.)

### 3. Deploy

Since this backend lives in a `backend/` subfolder, not your repo root,
deploy it as its own git subtree push:

```bash
cd backend
git init                      # only if you want this folder as its own repo - see note below
```

Simplest approach: Heroku can deploy a subfolder using its buildpack
subdir support, or you can keep `backend/` as a separate git repository
entirely (a second GitHub repo just for the backend) and connect that repo
to the Heroku app in the Heroku dashboard (Deploy tab -> GitHub -> connect
repo -> enable automatic deploys). I'd recommend the separate-repo route
since it's the least fiddly - ask me and I'll set that up once you've
created the GitHub repo for it.

### 4. Point the domain at things

- Your main domain (e.g. `chatshack.app`) keeps pointing at Netlify, where
  the React site is already deployed - no change needed there.
- Use a subdomain for the API, e.g. `api.chatshack.app`, with a CNAME
  record pointing at `thechatshack-api.herokuapp.com` (Name.com's DNS
  panel, and `heroku domains:add api.chatshack.app` on the Heroku side).

### 5. Create your real admin login

```bash
heroku run python manage.py createsuperuser
```

Pick your own username and a strong password - I won't generate or see
real login credentials for you.
