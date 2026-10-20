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
- **A JSON API** (`/api/...`) that the React site calls instead of just
  reading the static `public/content/home.json` file, so editing content
  in the admin actually changes the live site.

## This is live

Everything below is actually deployed and working, not just planned:

- **Domain**: `chatshack.app`, registered free for the first year via the
  GitHub Student Developer Pack / Name.com. The main site now lives there
  (it used to be at `chatshack.sarahjhill.com` - that address no longer
  serves the site). `www.chatshack.app` also works and redirects to the
  main domain.
- **Backend hosting**: Heroku app `thechatshack-api`, with a real Postgres
  database (the `heroku-postgresql:essential-0` add-on, a few pence an
  hour, drawing from your student credits).
- **Backend's own address**: `https://api.chatshack.app` (a CNAME pointing
  at the Heroku app - see "DNS records" below). The plain Heroku address
  (`thechatshack-api-20bebef297b5.herokuapp.com`) still works too, but
  `api.chatshack.app` is the one to use and share.
- **Admin login**: `https://api.chatshack.app/admin/` - log in with the
  superuser you created via `heroku run python manage.py createsuperuser`.
- **The old Decap CMS admin** (`chatshack.sarahjhill.com/admin/`) has been
  removed entirely - this Django admin replaces it.
- **The React site** (`../src/pages/home/HomePage.tsx`) fetches homepage
  content from `GET https://api.chatshack.app/api/home/` first, falling
  back to the static `public/content/home.json` file only if the API is
  unreachable - so edits you make in the admin show up on the live site.
- **All three forms** on the site submit straight to this backend:
  - **Community page** "Tell us what's needed" box -> `POST /api/suggestions/`
  - **Support page** First Contact form (a real form now, not just a PDF
    download - the PDF is still there as an alternative) -> `POST /api/first-contact/`
  - **Partners & Resources** application form (same - real form, PDF still
    available) -> `POST /api/partner-applications/`

The frontend only does any of this when `VITE_API_URL` is set (see
`../.env` for local dev, already pointing at `http://127.0.0.1:8000`, and
`../.env.production` for the live build, pointing at
`https://api.chatshack.app`) - without it, each form shows a friendly
fallback instead of silently failing.

## Editing site content in admin

The admin at `https://api.chatshack.app/admin/` now covers every main page
on the site, not just the homepage, and it's been restyled (via
django-unfold) to be easier to use day to day. Under "Site content" in
the sidebar:

- **Site settings** - contact details, WhatsApp/Facebook, and branding
  (the name/taglines/logo shown in the navbar and footer, the footer quote
  and copyright line).
- **Homepage content** - unchanged from before, one JSON block for the
  whole homepage.
- **Page heroes (banner images)** - the big photo + heading + subtitle at
  the top of About, I Need Support, Our Community, Partners & Resources,
  Homeless Outreach, Get Involved and Contact Us. One row per page -
  click a page's row to edit its text or upload a replacement photo.
- **Page sections** - the freeform paragraphs on each page (e.g. About's
  "Why The ChatShack exists", Support's "What to expect"). Each one has a
  heading, body text (leave a blank line between paragraphs) and an
  optional photo. Filter by page in the list to find the one you want.
- **Cards & lists** - everything that repeats on a page: principles,
  FAQs, "how we help" cards, community photos, ways to get involved, and
  so on. Add a new row to add a new card/photo to that list, or delete
  one to remove it. Order controls where it appears (lower numbers
  first) - editable right from the list page.

Anything left blank in admin falls back to the page's original built-in
text/photo, so there's no way to accidentally blank out the site - you're
only ever overriding what's already there.

### Uploading photos

Photo uploads (anywhere you see an image field) are stored on
[Cloudinary](https://cloudinary.com)'s free tier, not on Heroku itself -
Heroku wipes its own disk on every deploy, so photos saved there would
vanish. To enable uploads:

1. Create a free Cloudinary account.
2. From its Dashboard, copy your Cloud name, API Key and API Secret.
3. Set them as Heroku config vars:
   ```bash
   heroku config:set CLOUDINARY_CLOUD_NAME=... CLOUDINARY_API_KEY=... CLOUDINARY_API_SECRET=... --app thechatshack-api
   ```

Until that's done, the image upload fields in admin will simply fail to
save a new photo - text editing works regardless.

## DNS records (Name.com, on the `chatshack.app` domain)

For reference, in case anything ever needs re-pointing:

| Type  | Host | Answer |
|-------|------|--------|
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |
| CNAME | www  | sarahjhill.github.io |
| CNAME | api  | warm-banana-6dqbv2g7uo8wh56he1dik79g.herokudns.com |

The four `A` records and the `www` `CNAME` are what GitHub Pages needs to
serve the React site at the root domain. The `api` `CNAME` is what Heroku
gave when you ran `heroku domains:add api.chatshack.app` - Heroku
auto-manages the SSL certificate for it once that's resolving correctly
(this can take a few minutes up to about a day after DNS changes).

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
created locally (separate from the real one on the live site).

To see the React site actually talking to this backend locally, also run
the frontend dev server in another terminal (`npm run dev` from the repo
root) - `.env` already points it at `http://127.0.0.1:8000`.

API endpoints to try:
- `GET /api/home/` - homepage content as JSON
- `GET /api/settings/` - contact details
- `GET /api/events/` - published upcoming events + shifts
- `POST /api/suggestions/`, `/api/first-contact/`, `/api/partner-applications/` - form submissions
- `POST /api/shifts/<id>/signup/` - volunteer shift sign-up

## Deploying changes (once this is already set up, as it is now)

Any time you change something in `backend/` and want it live:

```bash
git add -A
git commit -m "..."
git push                                        # pushes to GitHub as normal
git subtree push --prefix backend heroku main   # deploys just backend/ to Heroku
```

Run from the repo root (`app/`), not from inside `backend/`. Migrations
run automatically as part of the deploy (the `release` line in
`Procfile`).

## What's still outstanding

- **Email sending**: notification emails print to the Heroku log rather
  than actually sending, since no real email provider is configured yet.
  Needs `EMAIL_HOST`, `EMAIL_HOST_USER`, and `EMAIL_HOST_PASSWORD` config
  vars once you've picked a provider (e.g. SendGrid has a free tier, and
  there's a Heroku add-on for it).
- **HTTPS enforcement on GitHub Pages**: check Settings -> Pages on the
  repo shows a green checkmark for `chatshack.app`, and tick "Enforce
  HTTPS" there once it's available (it's greyed out until GitHub verifies
  the domain and issues a certificate).
