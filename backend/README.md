# The ChatShack - Django backend

This is a separate backend alongside the React/Vite site in `../` (the
public site itself is untouched - how it looks and works for visitors
hasn't changed). This backend gives you:

- **A proper admin** (`/admin/`) where you can edit the homepage content,
  site-wide contact details, see every form submission, and manage
  volunteering events/shifts.
- **Storage for every form on the site**: general Contact, Website
  Feedback & Suggestions, the First Contact & Initial Support form (on
  both the Support and Contact pages), Community page suggestions,
  Partners & Resources applications, volunteer applications, and the
  Events page's "Register your interest" (Sleep Out to Help Out) form -
  all save to the database and show up in the admin.
- **Email notifications**: you (at the `NOTIFY_EMAIL` address, currently
  your enquiries address) get emailed whenever someone submits a form or
  signs up for a volunteer shift.
- **A volunteer events/shifts system**: create an Event, add Shifts to it,
  and volunteers can sign up for a shift until it's full - you get emailed
  each time.
- **Donations via Stripe**: a donation or shop-item checkout creates a
  Stripe Checkout session; a webhook confirms when payment's gone through.
- **A JSON API** (`/api/...`) that the React site calls instead of just
  reading static files, so editing content in the admin actually changes
  the live site.

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
- **Every form on the site** submits straight to this backend:
  - **Contact page** general enquiries -> `POST /api/contact/`
  - **Contact page** website feedback & suggestions -> `POST /api/improvement-feedback/`
  - **Support & Contact pages** First Contact & Initial Support form -> `POST /api/first-contact/`
  - **Community page** "tell us what's needed" box -> `POST /api/suggestions/`
  - **Partners & Resources** application form -> `POST /api/partner-applications/`
  - **Volunteer application** -> `POST /api/volunteer-applications/`
  - **Events page** "Register your interest" (Sleep Out to Help Out) -> `POST /api/sleep-out-interest/`
  - **Volunteer shift sign-up** -> `POST /api/shifts/<id>/signup/`

The frontend only does any of this when `VITE_API_URL` is set (see
`../.env` for local dev, already pointing at `http://127.0.0.1:8000`, and
`../.env.production` for the live build, pointing at
`https://api.chatshack.app`) - without it, each form shows a friendly
fallback instead of silently failing.

## Editing site content in admin

The admin at `https://api.chatshack.app/admin/` covers every main page on
the site, not just the homepage, and it's been restyled (via
django-unfold) to be easier to use day to day. Under "Site content" in
the sidebar:

- **Site settings** - contact details, WhatsApp/Facebook, and branding
  (the name/taglines/logo shown in the navbar and footer, the footer quote
  and copyright line).
- **Homepage content** - unchanged from before, one JSON block for the
  whole homepage.
- **Edit a page** - click this, then click one of the 7 pages listed
  (About Us, I Need Support, Our Community, Partners & Resources,
  Homeless Outreach, Get Involved, Contact Us). That one screen has
  everything for that page:
  - the banner at the top (photo, heading, subtitle),
  - every text section further down the page, each with a heading, body
    text (leave a blank line between paragraphs) and an optional photo,
  - every card/list on that page (principles, FAQs, "how we help" cards,
    community photos, ways to get involved, etc.) - use "Add another" to
    add a new card or photo, or the delete checkbox to remove one, and
    the Order number to control where it appears (lower numbers first).

  Each text section and card has a dropdown to say which one it is (e.g.
  "About Us · Why we exist") rather than needing to type anything - this
  is what stops a typo from making something silently not show up on the
  live site.

  Note: the **Events page** isn't on this list - its content (the group
  schedule, timeline, and the Sleep Out to Help Out story) is written
  directly into the page's code rather than edited in admin, since it's
  less a set of reusable cards and more a one-off piece of writing. Ask
  your developer to update it if anything there needs to change.

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
- `GET /api/pages/<page>/` - content for any of the 7 CMS-managed pages
- `GET /api/events/` - published upcoming events + shifts
- `POST /api/contact/`, `/api/improvement-feedback/`, `/api/first-contact/`,
  `/api/suggestions/`, `/api/partner-applications/`,
  `/api/volunteer-applications/`, `/api/sleep-out-interest/` - form submissions
- `POST /api/shifts/<id>/signup/` - volunteer shift sign-up
- `GET /api/shop/items/`, `POST /api/shop/checkout/`, `POST /api/shop/donate/`,
  `POST /api/shop/webhook/` - Stripe checkout and donations

## Security settings (production)

When `DEBUG` is off (as it is in production), this backend also:

- Forces every request onto HTTPS (`SECURE_SSL_REDIRECT`).
- Tells browsers to remember, for a year, to only ever reach this host
  over HTTPS (`SECURE_HSTS_SECONDS`).
- Marks session and CSRF cookies as HTTPS-only (`SESSION_COOKIE_SECURE`,
  `CSRF_COOKIE_SECURE`).

Double-check the `DJANGO_SECRET_KEY` Heroku config var is set to a long,
random value (not the insecure placeholder used as a local-only default) -
this isn't something that can be checked from the code itself.

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

- **Email sending**: double-check `EMAIL_HOST`, `EMAIL_HOST_USER`, and
  `EMAIL_HOST_PASSWORD` are set as Heroku config vars with a real email
  provider (e.g. SendGrid has a free tier, and there's a Heroku add-on for
  it) - without them, notification emails print to the Heroku log instead
  of actually sending.
- **HTTPS enforcement on GitHub Pages**: check Settings -> Pages on the
  repo shows a green checkmark for `chatshack.app`, and tick "Enforce
  HTTPS" there once it's available (it's greyed out until GitHub verifies
  the domain and issues a certificate).

## Copyright & licence

See [../LICENSE](../LICENSE). The ChatShack's content and branding belong
to The ChatShack, founded by Scott Hartley. All rights reserved.
