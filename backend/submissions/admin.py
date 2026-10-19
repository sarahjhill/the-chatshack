from django.contrib import admin

from .models import FirstContactSubmission, PartnerApplicationSubmission, SuggestionSubmission


@admin.register(SuggestionSubmission)
class SuggestionSubmissionAdmin(admin.ModelAdmin):
    list_display = ["name_display", "email", "message_preview", "created_at", "is_reviewed"]
    list_filter = ["is_reviewed", "created_at"]
    search_fields = ["name", "email", "message"]
    readonly_fields = ["name", "email", "message", "created_at"]

    @admin.display(description="From")
    def name_display(self, obj):
        return obj.name or "Anonymous"

    @admin.display(description="Message")
    def message_preview(self, obj):
        return (obj.message[:80] + "…") if len(obj.message) > 80 else obj.message


@admin.register(FirstContactSubmission)
class FirstContactSubmissionAdmin(admin.ModelAdmin):
    list_display = ["name_display", "email", "phone", "preferred_contact_method", "created_at", "is_contacted"]
    list_filter = ["is_contacted", "preferred_contact_method", "created_at"]
    search_fields = ["name", "email", "phone", "message"]
    readonly_fields = ["name", "email", "phone", "preferred_contact_method", "message", "created_at"]

    @admin.display(description="Name")
    def name_display(self, obj):
        return obj.name or "Anonymous"


@admin.register(PartnerApplicationSubmission)
class PartnerApplicationSubmissionAdmin(admin.ModelAdmin):
    list_display = ["organisation_name", "contact_name", "email", "status", "created_at"]
    list_filter = ["status", "created_at"]
    search_fields = ["organisation_name", "contact_name", "email", "services_offered"]
    readonly_fields = [
        "organisation_name",
        "contact_name",
        "email",
        "phone",
        "services_offered",
        "message",
        "created_at",
    ]
