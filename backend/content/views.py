from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import HomePageContent, SiteSettings
from .serializers import HomePageContentSerializer, SiteSettingsSerializer


class HomePageContentView(APIView):
    """GET /api/home/ - returns the editable homepage content as JSON, in
    the same shape the React site's DEFAULT_CONTENT/home.json already use."""

    permission_classes = [AllowAny]

    def get(self, request):
        obj = HomePageContent.load()
        return Response(HomePageContentSerializer(obj).data["content"])


class SiteSettingsView(APIView):
    """GET /api/settings/ - site-wide contact details and social links."""

    permission_classes = [AllowAny]

    def get(self, request):
        obj = SiteSettings.load()
        return Response(SiteSettingsSerializer(obj).data)
