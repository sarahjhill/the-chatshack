from rest_framework import serializers

from .models import (
    ContactMessageSubmission,
    FirstContactSubmission,
    ImprovementFeedbackSubmission,
    PartnerApplicationSubmission,
    SleepOutInterestSubmission,
    SuggestionSubmission,
    VolunteerApplicationSubmission,
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


class ImprovementFeedbackSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImprovementFeedbackSubmission
        fields = ["name", "email", "message"]


class SleepOutInterestSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SleepOutInterestSubmission
        fields = ["name", "email"]


class VolunteerApplicationSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VolunteerApplicationSubmission
        fields = ["name", "email", "phone", "roles", "availability", "about", "is_over_18"]

    def validate_is_over_18(self, value):
        if not value:
            raise serializers.ValidationError("Volunteers must be aged 18 or over.")
        return value
