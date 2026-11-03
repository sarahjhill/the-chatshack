from django.urls import path

from .views import (
    ContactMessageCreateView,
    FirstContactCreateView,
    ImprovementFeedbackCreateView,
    PartnerApplicationCreateView,
    SleepOutInterestCreateView,
    SuggestionCreateView,
    VolunteerApplicationCreateView,
)

urlpatterns = [
    path("contact/", ContactMessageCreateView.as_view(), name="api-contact-create"),
    path("suggestions/", SuggestionCreateView.as_view(), name="api-suggestion-create"),
    path("first-contact/", FirstContactCreateView.as_view(), name="api-first-contact-create"),
    path("partner-applications/", PartnerApplicationCreateView.as_view(), name="api-partner-application-create"),
    path("improvement-feedback/", ImprovementFeedbackCreateView.as_view(), name="api-improvement-feedback-create"),
    path("sleep-out-interest/", SleepOutInterestCreateView.as_view(), name="api-sleep-out-interest-create"),
    path(
        "volunteer-applications/",
        VolunteerApplicationCreateView.as_view(),
        name="api-volunteer-application-create",
    ),
]
