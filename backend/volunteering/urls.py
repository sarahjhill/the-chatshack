from django.urls import path

from .views import ShiftSignupCreateView, UpcomingEventsListView

urlpatterns = [
    path("events/", UpcomingEventsListView.as_view(), name="api-events-list"),
    path("shifts/<int:shift_id>/signup/", ShiftSignupCreateView.as_view(), name="api-shift-signup"),
]
