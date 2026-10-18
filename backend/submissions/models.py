from django.db import models


class SuggestionSubmission(models.Model):
    """'Tell us what's needed' box on the Community page. Name is optional -
    the site tells people they don't need to give it."""

    name = models.CharField(max_length=150, blank=True)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_reviewed = models.BooleanField(default=False, help_text="Tick once Scott has read and actioned this.")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        who = self.name or "Anonymous"
        return f"{who} - {self.created_at:%d %b %Y}"


class FirstContactSubmission(models.Model):
    """The 'First Contact & Initial Support Form' from the Support page -
    entirely optional for the person filling it in, nothing is compulsory."""

    name = models.CharField(max_length=150, blank=True)
    email = models.EmailField(blank=True)
    phone = models.CharField(max_length=30, blank=True)
    preferred_contact_method = models.CharField(
        max_length=20,
        choices=[("email", "Email"), ("phone", "Phone"), ("either", "Either")],
        blank=True,
    )
    message = models.TextField(
        blank=True, help_text="Anything they'd like to share ahead of first contact - entirely optional."
    )
    created_at = models.DateTimeField(auto_now_add=True)
    is_contacted = models.BooleanField(default=False, help_text="Tick once someone has followed up with this person.")

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        who = self.name or "Anonymous"
        return f"{who} - {self.created_at:%d %b %Y}"


class PartnerApplicationSubmission(models.Model):
    """From the Partners & Resources page - organisations/individuals
    applying to offer services to The ChatShack and its service users."""

    organisation_name = models.CharField(max_length=200)
    contact_name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=30, blank=True)
    services_offered = models.TextField(help_text="What support/services they're offering.")
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ("new", "New"),
            ("in_review", "In review"),
            ("approved", "Approved partner"),
            ("declined", "Declined"),
        ],
        default="new",
    )

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.organisation_name} ({self.get_status_display()})"
