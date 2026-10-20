from django import forms
from django.contrib import admin
from django.shortcuts import redirect
from unfold.admin import ModelAdmin

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


@admin.register(PageHero)
class PageHeroAdmin(ModelAdmin):
    list_display = ["page", "title", "subtitle"]
    list_editable = ["title", "subtitle"]
    search_fields = ["title", "subtitle", "eyebrow"]
    fields = ["page", "eyebrow", "title", "subtitle", "image"]

    def has_add_permission(self, request):
        # One hero per page only - rows are created by the initial data
        # migration, so Scott only ever edits the existing ones.
        return False

    def has_delete_permission(self, request, obj=None):
        return False


@admin.register(ContentBlock)
class ContentBlockAdmin(ModelAdmin):
    list_display = ["page", "section", "order", "heading"]
    list_editable = ["order"]
    list_filter = ["page", "section"]
    search_fields = ["heading", "body"]
    fields = ["page", "section", "order", "heading", "body", "image", "link_text", "link_url"]


@admin.register(ListItem)
class ListItemAdmin(ModelAdmin):
    list_display = ["page", "section", "order", "title"]
    list_editable = ["order"]
    list_filter = ["page", "section"]
    search_fields = ["title", "description"]
    fields = ["page", "section", "order", "title", "description", "image"]
