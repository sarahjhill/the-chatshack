from django.apps import AppConfig


class VolunteeringConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "volunteering"

    def ready(self):
        from . import signals  # noqa: F401
