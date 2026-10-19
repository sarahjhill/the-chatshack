import json
from pathlib import Path

from django.db import migrations


def load_home_json():
    # Prefer the copy bundled inside backend/ (content/seed_data/home.json) -
    # this is what's actually present when the backend is deployed on its
    # own (e.g. a git subtree push to Heroku), where the rest of the repo
    # isn't there. Fall back to the live public/content/home.json one level
    # up the main repo, for local dev convenience if that bundled copy is
    # ever missing.
    bundled = Path(__file__).resolve().parent.parent / "seed_data" / "home.json"
    if bundled.exists():
        with bundled.open(encoding="utf-8") as f:
            return json.load(f)
    fallback = Path(__file__).resolve().parent.parent.parent.parent / "public" / "content" / "home.json"
    if fallback.exists():
        with fallback.open(encoding="utf-8") as f:
            return json.load(f)
    return {}


def seed_homepage_content(apps, schema_editor):
    HomePageContent = apps.get_model("content", "HomePageContent")
    SiteSettings = apps.get_model("content", "SiteSettings")

    data = load_home_json()
    obj, _ = HomePageContent.objects.get_or_create(pk=1)
    obj.content = data
    obj.save()

    SiteSettings.objects.get_or_create(pk=1)


def noop_reverse(apps, schema_editor):
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("content", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_homepage_content, noop_reverse),
    ]
