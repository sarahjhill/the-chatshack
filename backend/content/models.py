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
    social links, branding text) so Scott can update them in one place."""

    contact_email = models.EmailField(default="enquiries.the.chatshack01@gmail.com")
    contact_phone = models.CharField(max_length=30, blank=True, default="07951 850873")
    whatsapp_number = models.CharField(max_length=30, blank=True, default="07375 305186")
    facebook_url = models.URLField(blank=True, default="https://facebook.com/TheChatShack")
    messenger_handle = models.CharField(max_length=100, blank=True, default="@TheChatShack")

    # --- Branding (navbar + footer) --------------------------------------
    site_name = models.CharField(max_length=100, blank=True, default="THE CHAT SHACK")
    tagline_1 = models.CharField(max_length=150, blank=True, default="Peer-led Mental Health Support")
    tagline_2 = models.CharField(max_length=150, blank=True, default="Community Group for 18+")
    logo = models.ImageField(upload_to="branding/", blank=True, null=True, help_text="The round logo shown in the navbar and footer.")
    footer_quote = models.CharField(
        max_length=200, blank=True, default="It's ok not to be ok. It's not ok to stay there."
    )
    footer_copyright_text = models.CharField(
        max_length=200,
        blank=True,
        default="The Chat Shack C.I.C. Registered in England & Wales. All rights reserved.",
        help_text="Shown after the year, e.g. '© 2026 <this text>'.",
    )

    def __str__(self):
        return "Site settings"

    class Meta:
        verbose_name = "Site settings"
        verbose_name_plural = "Site settings"


PAGE_CHOICES = [
    ("about", "About Us"),
    ("support", "I Need Support"),
    ("community", "Our Community"),
    ("partners", "Partners & Resources"),
    ("homeless_outreach", "Homeless Outreach"),
    ("get_involved", "Get Involved"),
    ("contact", "Contact Us"),
]


class PageHero(models.Model):
    """The banner at the top of one of the site's main pages - the big
    background photo, eyebrow text, title and subtitle. One row per page."""

    page = models.CharField(max_length=30, choices=PAGE_CHOICES, unique=True)
    eyebrow = models.CharField(max_length=150, blank=True, help_text="Small text above the title.")
    title = models.CharField(max_length=150)
    subtitle = models.CharField(max_length=300, blank=True)
    image = models.ImageField(
        upload_to="hero/",
        blank=True,
        null=True,
        help_text="Background photo. Leave blank to keep the page's existing built-in photo.",
    )

    def __str__(self):
        return f"{self.get_page_display()} - hero"

    class Meta:
        verbose_name = "Page hero (banner)"
        verbose_name_plural = "Page heroes (banners)"
        ordering = ["page"]


class ContentBlock(models.Model):
    """A freeform heading + paragraph (+ optional photo and link) within a
    page - e.g. the "Why we exist" section on the About page. Blocks are
    grouped by `section` within a page (a page can have several, shown in
    the order given by `order`), so new ones can be added or removed in
    admin without touching any code."""

    page = models.CharField(max_length=30, choices=PAGE_CHOICES)
    section = models.SlugField(
        max_length=50,
        help_text="Groups blocks together, e.g. 'why_we_exist'. Leave as the default unless adding a brand new section.",
    )
    order = models.PositiveIntegerField(default=0)
    heading = models.CharField(max_length=200, blank=True)
    body = models.TextField(blank=True, help_text="Paragraph text. Leave a blank line between paragraphs.")
    image = models.ImageField(upload_to="blocks/", blank=True, null=True)
    link_text = models.CharField(max_length=100, blank=True)
    link_url = models.CharField(max_length=300, blank=True, help_text="e.g. /get-involved or https://...")

    def __str__(self):
        return f"{self.get_page_display()} / {self.section} - {self.heading or '(no heading)'}"

    class Meta:
        verbose_name = "Page section"
        verbose_name_plural = "Page sections"
        ordering = ["page", "section", "order"]


class ListItem(models.Model):
    """One card/row within a repeatable list on a page - a principle, an
    FAQ, a community photo, a 'how to get involved' option, etc. Grouped by
    `section` within a page so Scott can add or remove individual items
    (including photos) without needing a developer."""

    page = models.CharField(max_length=30, choices=PAGE_CHOICES)
    section = models.SlugField(
        max_length=50,
        help_text="Which list this item belongs to on the page, e.g. 'principles', 'faqs', 'photo_strip'.",
    )
    order = models.PositiveIntegerField(default=0)
    title = models.CharField(max_length=200, blank=True, help_text="Or the FAQ question, for FAQ items.")
    description = models.TextField(blank=True, help_text="Or the FAQ answer, for FAQ items.")
    image = models.ImageField(upload_to="items/", blank=True, null=True)

    def __str__(self):
        return f"{self.get_page_display()} / {self.section}: {self.title or '(photo)'}"

    class Meta:
        verbose_name = "Card / list item"
        verbose_name_plural = "Cards & list items"
        ordering = ["page", "section", "order"]
