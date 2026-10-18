from django.db import models


class SingletonModel(models.Model):
    """A model that only ever has one row - used for site-wide content that
    doesn't need multiple instances (there's only one homepage, one set of
    site-wide contact details)."""

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        pass  # singletons are never deleted, only edited

    @classmethod
    def load(cls):
        obj, _ = cls.objects.get_or_create(pk=1)
        return obj


class HomePageContent(SingletonModel):
    """Everything on the public homepage that Scott should be able to edit
    himself, mirroring the structure the site already uses (previously
    hand-edited as public/content/home.json via Netlify/Decap CMS).

    `content` holds the full structure as JSON (hero text, about section,
    approach cards, promise items, crisis section, etc.) so every existing
    field keeps working without the React site changing at all - the API
    just serves this instead of the static home.json file. Individual
    fields can be split out of the JSON into real model fields later for a
    friendlier admin editing experience, without changing the API shape.
    """

    content = models.JSONField(
        default=dict,
        help_text="Full homepage content (hero, about, approach, promise, crisis sections, etc.) as JSON.",
    )
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Homepage content"

    class Meta:
        verbose_name = "Homepage content"
        verbose_name_plural = "Homepage content"


class SiteSettings(SingletonModel):
    """Site-wide details used across multiple pages (contact details,
    social links) so Scott can update them in one place."""

    contact_email = models.EmailField(default="enquiries.the.chatshack01@gmail.com")
    contact_phone = models.CharField(max_length=30, blank=True, default="07951 850873")
    whatsapp_number = models.CharField(max_length=30, blank=True, default="07375 305186")
    facebook_url = models.URLField(blank=True, default="https://facebook.com/TheChatShack")
    messenger_handle = models.CharField(max_length=100, blank=True, default="@TheChatShack")

    def __str__(self):
        return "Site settings"

    class Meta:
        verbose_name = "Site settings"
        verbose_name_plural = "Site settings"
