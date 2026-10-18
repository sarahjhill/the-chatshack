from django.urls import path

from .views import HomePageContentView, SiteSettingsView

urlpatterns = [
    path("home/", HomePageContentView.as_view(), name="api-home-content"),
    path("settings/", SiteSettingsView.as_view(), name="api-site-settings"),
]
