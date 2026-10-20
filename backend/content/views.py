from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import ContentBlock, HomePageContent, ListItem, PAGE_CHOICES, PageHero, SiteSettings
from .serializers import (
    ContentBlockSerializer,
    HomePageContentSerializer,
    ListItemSerializer,
    PageHeroSerializer,
    SiteSettingsSerializer,
)

VALID_PAGE_KEYS = {key for key, _ in PAGE_CHOICES}


class HomePageContentView(APIView):
    """GET /api/home/ - returns the editable homepage content as JSON, in
    the same shape the React site's DEFAULT_CONTENT/home.json already use."""

    permission_classes = [AllowAny]

    def get(self, request):
        obj = HomePageContent.load()
        return Response(HomePageContentSerializer(obj).data["content"])


class SiteSettingsView(APIView):
    """GET /api/settings/ - site-wide contact details, branding and social links."""

    permission_classes = [AllowAny]

    def get(self, request):
        obj = SiteSettings.load()
        return Response(SiteSettingsSerializer(obj, context={"request": request}).data)


class PageContentView(APIView):
    """GET /api/pages/<page>/ - everything editable for one of the site's
    main pages: its hero banner, its freeform content blocks (grouped by
    section), and its repeatable list items/cards (also grouped by
    section). Returns 404-shaped empty content for an unknown page key
    rather than erroring, so the frontend can always fall back safely."""

    permission_classes = [AllowAny]

    def get(self, request, page):
        if page not in VALID_PAGE_KEYS:
            return Response({"hero": None, "blocks": {}, "items": {}})

        try:
            hero = PageHero.objects.get(page=page)
            hero_data = PageHeroSerializer(hero, context={"request": request}).data
        except PageHero.DoesNotExist:
            hero_data = None

        blocks_by_section: dict[str, list] = {}
        for block in ContentBlock.objects.filter(page=page).order_by("section", "order"):
            blocks_by_section.setdefault(block.section, []).append(
                ContentBlockSerializer(block, context={"request": request}).data
            )

        items_by_section: dict[str, list] = {}
        for item in ListItem.objects.filter(page=page).order_by("section", "order"):
            items_by_section.setdefault(item.section, []).append(
                ListItemSerializer(item, context={"request": request}).data
            )

        return Response({"hero": hero_data, "blocks": blocks_by_section, "items": items_by_section})
