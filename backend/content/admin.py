from django import forms
from django.contrib import admin

from .models import HomePageContent, SiteSettings


class HomePageContentForm(forms.ModelForm):
    content = forms.JSONField(
        widget=forms.Textarea(attrs={"rows": 30, "style": "font-family: monospace; width: 100%;"})
    )

    class Meta:
        model = HomePageContent
        fields = ["content"]


@admin.register(HomePageContent)
class HomePageContentAdmin(admin.ModelAdmin):
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
        from django.shortcuts import redirect

        return redirect("admin:content_homepagecontent_change", obj.pk)


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    fields = [
        "contact_email",
        "contact_phone",
        "whatsapp_number",
        "facebook_url",
        "messenger_handle",
    ]

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changelist_view(self, request, extra_context=None):
        obj = SiteSettings.load()
        from django.shortcuts import redirect

        return redirect("admin:content_sitesettings_change", obj.pk)
