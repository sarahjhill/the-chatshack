from django.urls import path

from .views import ContactMessageCreateView, FirstContactCreateView, PartnerApplicationCreateView, SuggestionCreateView

urlpatterns = [
    path("contact/", ContactMessageCreateView.as_view(), name="api-contact-create"),
    path("suggestions/", SuggestionCreateView.as_view(), name="api-suggestion-create"),
    path("first-contact/", FirstContactCreateView.as_view(), name="api-first-contact-create"),
    path("partner-applications/", PartnerApplicationCreateView.as_view(), name="api-partner-application-create"),
]
