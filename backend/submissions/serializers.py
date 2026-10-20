from rest_framework import serializers

from .models import (
    ContactMessageSubmission,
    FirstContactSubmission,
    PartnerApplicationSubmission,
    SuggestionSubmission,
)


class ContactMessageSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessageSubmission
        fields = ["name", "email", "message"]


class SuggestionSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SuggestionSubmission
        fields = ["name", "email", "message"]


class FirstContactSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = FirstContactSubmission
        fields = ["name", "email", "phone", "preferred_contact_method", "message"]


class PartnerApplicationSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnerApplicationSubmission
        fields = ["organisation_name", "contact_name", "email", "phone", "services_offered", "message"]
