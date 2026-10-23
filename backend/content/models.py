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
        default="The Chat Shack - Cardiff community run charity. Registered in England & Wales. All rights reserved.",
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

_PAGE_LABELS = dict(PAGE_CHOICES)


class PageHero(models.Model):
    """The banner at the top of one of the site's main pages - the big
    background photo, eyebrow text, title and subtitle - plus, via the
    inlines below it in admin, every other editable section and
    card/list on that page. This is the single screen Scott opens to edit
    one page's whole content."""

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
        return self.get_page_display()

    class Meta:
        verbose_name = "Page"
        verbose_name_plural = "Pages"
        ordering = ["page"]


# Every freeform text section that exists on each page, as (value, label)
# pairs for a dropdown - this is what stops a typo'd section name from
# silently not showing up on the live site. Labelled with the page name so
# it's unambiguous even though the field doesn't filter by page.
CONTENT_BLOCK_SECTION_CHOICES = [
    ("why_we_exist", "About Us · Why we exist"),
    ("ethos", "About Us · Our ethos & mission"),
    ("founder_note", "About Us · Founder's note"),
    ("what_to_expect", "I Need Support · What to expect"),
    ("closing", "I Need Support · Closing message"),
    ("intro", "Our Community / Homeless Outreach · Intro"),
    ("how_groups_run", "Our Community · How our groups run"),
    ("suggestions_intro", "Our Community · Suggestions intro"),
    ("principle", "Partners & Resources · Our guiding principle"),
    ("homeless_support", "Partners & Resources · Homeless support team"),
    ("how_we_refer", "Partners & Resources · How we refer"),
    ("how_we_approach", "Homeless Outreach · How we approach people"),
    ("advocacy", "Homeless Outreach · Advocacy"),
    ("the_van", "Homeless Outreach · The Van caption"),
]

LIST_ITEM_SECTION_CHOICES = [
    ("who_we_are", "About Us · 'We listen / talk / signpost / connect' tags"),
    ("principles", "About Us · Core principles"),
    ("tags", "About Us · Small badge tags (SAFE SPACE, 18+, etc.)"),
    ("photo_strip", "About Us / Our Community · Photo strip"),
    ("how_we_help", "I Need Support · 'How we help' cards"),
    ("faqs", "I Need Support · FAQs"),
    ("included", "Our Community · 'Our community can include' list"),
    ("categories", "Partners & Resources · Signposting categories"),
    ("ethos", "Homeless Outreach · Outreach ethos list"),
    ("ways", "Get Involved · Ways to get involved"),
    ("safer_recruitment", "Get Involved · Safer recruitment note"),
]


class ContentBlock(models.Model):
    """A freeform heading + paragraph (+ optional photo and link) within a
    page - e.g. the "Why we exist" section on the About page. Edited as
    part of its page (see Pages above), so new ones can be added or
    removed without touching any code."""

    hero = models.ForeignKey(PageHero, on_delete=models.CASCADE, related_name="blocks", verbose_name="page")
    section = models.CharField(max_length=50, choices=CONTENT_BLOCK_SECTION_CHOICES)
    order = models.PositiveIntegerField(default=0)
    heading = models.CharField(max_length=200, blank=True)
    body = models.TextField(blank=True, help_text="Paragraph text. Leave a blank line between paragraphs.")
    image = models.ImageField(upload_to="blocks/", blank=True, null=True)
    link_text = models.CharField(max_length=100, blank=True)
    link_url = models.CharField(max_length=300, blank=True, help_text="e.g. /get-involved or https://...")

    def __str__(self):
        return f"{self.hero} / {self.get_section_display()}"

    class Meta:
        verbose_name = "Page section"
        verbose_name_plural = "Page sections"
        ordering = ["hero", "section", "order"]


class ListItem(models.Model):
    """One card/row within a repeatable list on a page - a principle, an
    FAQ, a community photo, a 'how to get involved' option, etc. Edited as
    part of its page (see Pages above), so Scott can add or remove
    individual items (including photos) without needing a developer."""

    hero = models.ForeignKey(PageHero, on_delete=models.CASCADE, related_name="items", verbose_name="page")
    section = models.CharField(max_length=50, choices=LIST_ITEM_SECTION_CHOICES)
    order = models.PositiveIntegerField(default=0)
    title = models.CharField(max_length=200, blank=True, help_text="Or the FAQ question, for FAQ items.")
    description = models.TextField(blank=True, help_text="Or the FAQ answer, for FAQ items.")
    image = models.ImageField(upload_to="items/", blank=True, null=True)

    def __str__(self):
        return f"{self.hero} / {self.get_section_display()}: {self.title or '(photo)'}"

    class Meta:
        verbose_name = "Card / list item"
        verbose_name_plural = "Cards & list items"
        ordering = ["hero", "section", "order"]
