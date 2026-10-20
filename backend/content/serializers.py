from rest_framework import serializers

from .models import ContentBlock, HomePageContent, ListItem, PageHero, SiteSettings


class HomePageContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomePageContent
        fields = ["content", "updated_at"]


class SiteSettingsSerializer(serializers.ModelSerializer):
    logo = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = SiteSettings
        fields = [
            "contact_email",
            "contact_phone",
            "whatsapp_number",
            "facebook_url",
            "messenger_handle",
            "site_name",
            "tagline_1",
            "tagline_2",
            "logo",
            "footer_quote",
            "footer_copyright_text",
        ]


class PageHeroSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = PageHero
        fields = ["eyebrow", "title", "subtitle", "image"]


class ContentBlockSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = ContentBlock
        fields = ["section", "order", "heading", "body", "image", "link_text", "link_url"]


class ListItemSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(use_url=True, required=False)

    class Meta:
        model = ListItem
        fields = ["section", "order", "title", "description", "image"]
