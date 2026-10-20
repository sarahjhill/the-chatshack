"""
Django settings for the ChatShack backend.

This backend is deliberately separate from the React/Vite site in ../src -
it exists to give Scott (the owner) a proper admin to manage site content,
to store every form submission from the public site, to send email
notifications, and to run the volunteer events/shifts system. It does not
render any public-facing pages itself (the React site stays exactly as is);
everything here is either the Django admin or a JSON API at /api/.
"""

import os
from pathlib import Path

import environ

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env(
    DEBUG=(bool, False),
)
# Reads backend/.env if present (see .env.example). Never commit the real .env.
environ.Env.read_env(BASE_DIR / ".env")

SECRET_KEY = env("DJANGO_SECRET_KEY", default="dev-only-insecure-secret-key-change-me")
DEBUG = env.bool("DEBUG", default=True)

ALLOWED_HOSTS = env.list("DJANGO_ALLOWED_HOSTS", default=["localhost", "127.0.0.1"])

# Domains allowed to POST forms (including the Django admin login) to this
# backend. Needed any time the admin is reached via a hostname Django
# wasn't told to trust by default - without this, logging into /admin/
# from a custom domain fails with "CSRF verification failed."
CSRF_TRUSTED_ORIGINS = env.list(
    "CSRF_TRUSTED_ORIGINS",
    default=[
        "https://api.chatshack.app",
        "https://thechatshack-api-20bebef297b5.herokuapp.com",
    ],
)

# ---------------------------------------------------------------------------
# Applications
# ---------------------------------------------------------------------------
INSTALLED_APPS = [
    "unfold",  # must come before django.contrib.admin - restyles the admin UI
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "cloudinary_storage",
    "cloudinary",
    "rest_framework",
    "corsheaders",
    "content",
    "submissions",
    "volunteering",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "chatshack_backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "chatshack_backend.wsgi.application"

# ---------------------------------------------------------------------------
# Database - sqlite for local dev; set DATABASE_URL in production (Heroku
# Postgres sets this automatically when you add the Postgres add-on).
# ---------------------------------------------------------------------------
DATABASES = {
    "default": env.db("DATABASE_URL", default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}")
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-gb"
TIME_ZONE = "Europe/London"
USE_I18N = True
USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"
STORAGES = {
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

# ---------------------------------------------------------------------------
# Image uploads (admin-uploaded photos for every page) are stored on
# Cloudinary's free tier, not on Heroku's own disk - Heroku's filesystem is
# wiped on every restart/deploy, so anything uploaded through the admin
# would otherwise vanish. Create a free account at cloudinary.com, then set
# these three env vars (Dashboard page shows all three at a glance).
# Locally, with no .env values set, image uploads are skipped gracefully by
# the frontend (pages fall back to their built-in default images).
# ---------------------------------------------------------------------------
CLOUDINARY_STORAGE = {
    "CLOUD_NAME": env("CLOUDINARY_CLOUD_NAME", default=""),
    "API_KEY": env("CLOUDINARY_API_KEY", default=""),
    "API_SECRET": env("CLOUDINARY_API_SECRET", default=""),
}
MEDIA_URL = "/media/"

# ---------------------------------------------------------------------------
# REST framework - admin-only writes except the specific public endpoints
# (form submissions, shift sign-ups) which allow anonymous POSTs.
# ---------------------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticatedOrReadOnly",
    ],
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "PAGE_SIZE": 50,
}

# ---------------------------------------------------------------------------
# CORS - the React site (local dev + the live domain) is allowed to call
# this API. Add the real production domain here once it's registered.
# ---------------------------------------------------------------------------
CORS_ALLOWED_ORIGINS = env.list(
    "CORS_ALLOWED_ORIGINS",
    default=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
)

# ---------------------------------------------------------------------------
# Email - console backend in dev (prints to the terminal instead of
# actually sending), real SMTP in production via env vars. Scott gets
# notified by email whenever a form is submitted or a shift is booked.
# ---------------------------------------------------------------------------
EMAIL_BACKEND = env(
    "EMAIL_BACKEND",
    default="django.core.mail.backends.console.EmailBackend",
)
EMAIL_HOST = env("EMAIL_HOST", default="")
EMAIL_PORT = env.int("EMAIL_PORT", default=587)
EMAIL_HOST_USER = env("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD", default="")
EMAIL_USE_TLS = env.bool("EMAIL_USE_TLS", default=True)
DEFAULT_FROM_EMAIL = env("DEFAULT_FROM_EMAIL", default="noreply@thechatshack.example")

# Where notification emails (new form submissions, new shift sign-ups) are
# sent. Defaults to Scott's real enquiries address used across the site.
NOTIFY_EMAIL = env("NOTIFY_EMAIL", default="enquiries.the.chatshack01@gmail.com")

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")
if not DEBUG:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True

# ---------------------------------------------------------------------------
# Admin UI (django-unfold) - restyles the built-in Django admin so it's
# cleaner and easier to use day-to-day, without needing a hand-built admin.
# ---------------------------------------------------------------------------
UNFOLD = {
    "SITE_TITLE": "The ChatShack Admin",
    "SITE_HEADER": "The ChatShack",
    "SITE_SYMBOL": "forum",
    "SHOW_HISTORY": True,
    "SHOW_VIEW_ON_SITE": False,
    "SIDEBAR": {
        "show_search": True,
        "navigation": [
            {
                "title": "Site content",
                "separator": True,
                "items": [
                    {"title": "Site settings", "icon": "tune", "link": "/admin/content/sitesettings/1/change/"},
                    {"title": "Homepage content", "icon": "home", "link": "/admin/content/homepagecontent/1/change/"},
                    {"title": "Edit a page", "icon": "edit_note", "link": "/admin/content/pagehero/"},
                ],
            },
            {
                "title": "Forms & submissions",
                "separator": True,
                "items": [
                    {"title": "Suggestions", "icon": "lightbulb", "link": "/admin/submissions/suggestionsubmission/"},
                    {"title": "First contact forms", "icon": "contact_mail", "link": "/admin/submissions/firstcontactsubmission/"},
                    {"title": "Partner applications", "icon": "handshake", "link": "/admin/submissions/partnerapplicationsubmission/"},
                    {"title": "Contact messages", "icon": "mail", "link": "/admin/submissions/contactmessagesubmission/"},
                ],
            },
            {
                "title": "Volunteering",
                "separator": True,
                "items": [
                    {"title": "Events & shifts", "icon": "event", "link": "/admin/volunteering/event/"},
                ],
            },
            {
                "title": "Admin users",
                "separator": True,
                "items": [
                    {"title": "Users", "icon": "person", "link": "/admin/auth/user/"},
                ],
            },
        ],
    },
}
