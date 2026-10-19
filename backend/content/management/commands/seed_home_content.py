import json
from pathlib import Path

from django.core.management.base import BaseCommand

from content.models import HomePageContent, SiteSettings

# The bundled copy lives inside the backend/ folder itself (seed_data/home.json)
# so it travels with the backend wherever it's deployed - e.g. via a git
# subtree push, where the rest of the repo (including the original
# public/content/home.json the React site reads from) isn't present.
BUNDLED_PATH = Path(__file__).resolve().parent.parent.parent / "seed_data" / "home.json"


class Command(BaseCommand):
    help = (
        "Seed (or re-seed) the homepage content from the bundled home.json "
        "snapshot. Safe to run more than once - it overwrites the single "
        "HomePageContent row with whatever's in seed_data/home.json."
    )

    def handle(self, *args, **options):
        if not BUNDLED_PATH.exists():
            self.stderr.write(self.style.ERROR(f"Bundled file not found: {BUNDLED_PATH}"))
            return

        with BUNDLED_PATH.open(encoding="utf-8") as f:
            data = json.load(f)

        obj, created = HomePageContent.objects.get_or_create(pk=1)
        obj.content = data
        obj.save()
        SiteSettings.objects.get_or_create(pk=1)

        verb = "Created and seeded" if created else "Re-seeded"
        self.stdout.write(self.style.SUCCESS(f"{verb} homepage content from {BUNDLED_PATH.name}."))
