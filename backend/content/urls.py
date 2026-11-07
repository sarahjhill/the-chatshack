from django.urls import path

from .views import HomePageContentView, PageContentView, PartnerListView, SiteSettingsView

urlpatterns = [
    path("home/", HomePageContentView.as_view(), name="api-home-content"),
    path("settings/", SiteSettingsView.as_view(), name="api-site-settings"),
    path("pages/<str:page>/", PageContentView.as_view(), name="api-page-content"),
    path("partners/", PartnerListView.as_view(), name="api-partners"),
]
