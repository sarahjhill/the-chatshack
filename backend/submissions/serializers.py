from rest_framework import serializers

from .models import FirstContactSubmission, PartnerApplicationSubmission, SuggestionSubmission


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
