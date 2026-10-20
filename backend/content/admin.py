from django import forms
from django.contrib import admin
from django.shortcuts import redirect
from unfold.admin import ModelAdmin, StackedInline

from .models import ContentBlock, HomePageContent, ListItem, PageHero, SiteSettings


class HomePageContentForm(forms.ModelForm):
    content = forms.JSONField(
        widget=forms.Textarea(attrs={"rows": 30, "style": "font-family: monospace; width: 100%;"})
    )

    class Meta:
        model = HomePageContent
        fields = ["content"]


@admin.register(HomePageContent)
class HomePageContentAdmin(ModelAdmin):
    form = HomePageContentForm
    readonly_fields = ["updated_at"]

    def has_add_permission(self, request):
        # Singleton - there's only ever one row, so hide "Add" once it exists.
        return not HomePageContent.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        # Skip the list page entirely and go straight to editing the one row.
        obj = HomePageContent.load()
        return redirect("admin:content_homepagecontent_change", obj.pk)


@admin.register(SiteSettings)
class SiteSettingsAdmin(ModelAdmin):
    fieldsets = (
        (
            "Contact details",
            {
                "fields": (
                    "contact_email",
                    "contact_phone",
                    "whatsapp_number",
                    "facebook_url",
                    "messenger_handle",
                )
            },
        ),
        (
            "Branding (shown in the navbar and footer on every page)",
            {
                "fields": (
                    "site_name",
                    "tagline_1",
                    "tagline_2",
                    "logo",
                    "footer_quote",
                    "footer_copyright_text",
                )
            },
        ),
    )

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj = SiteSettings.load()
        return redirect("admin:content_sitesettings_change", obj.pk)


class ContentBlockInline(StackedInline):
    model = ContentBlock
    extra = 0
    fields = ["section", "order", "heading", "body", "image", "link_text", "link_url"]
    verbose_name = "Text section"
    verbose_name_plural = "Text sections on this page"


class ListItemInline(StackedInline):
    model = ListItem
    extra = 0
    fields = ["section", "order", "title", "description", "image"]
    verbose_name = "Card / list item"
    verbose_name_plural = "Cards & list items on this page"


@admin.register(PageHero)
class PageHeroAdmin(ModelAdmin):
    """Everything editable on one page, in one place: the banner at the
    top (this model's own fields), then every text section and every
    card/list item on that page (as inlines below), each with its own
    add/remove controls."""

    list_display = ["page", "title", "subtitle"]
    fields = ["page", "eyebrow", "title", "subtitle", "image"]
    inlines = [ContentBlockInline, ListItemInline]

    def has_add_permission(self, request):
        # One row per page only - the 7 pages are fixed, created by the
        # initial data migration, so Scott only ever edits the existing ones.
        return False

    def has_delete_permission(self, request, obj=None):
        return False
