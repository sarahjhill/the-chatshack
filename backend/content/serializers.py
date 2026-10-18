from rest_framework import serializers

from .models import HomePageContent, SiteSettings


class HomePageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePageContent
        fields = ["content", "updated_at"]


class SiteSettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSettings
        fields = ["contact_email", "contact_phone", "whatsapp_number", "facebook_url", "messenger_handle"]
