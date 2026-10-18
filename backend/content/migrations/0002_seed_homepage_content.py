import json
from pathlib import Path

from django.db import migrations


def load_home_json():
    # ../public/content/home.json relative to this backend/ directory - the
    # real content the React site currently ships with (edited previously
    # via Netlify/Decap CMS). We seed the new Django-backed model with it so
    # Scott's admin opens already showing the real, current homepage text
    # instead of a blank slate.
    path = Path(__file__).resolve().parent.parent.parent.parent / "public" / "content" / "home.json"
    if not path.exists():
        return {}
    with path.open(encoding="utf-8") as f:
        return json.load(f)


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
