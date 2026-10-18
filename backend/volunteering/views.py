from django.shortcuts import get_object_or_404
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import Event, Shift
from .serializers import EventSerializer, ShiftSignupSerializer


class UpcomingEventsListView(generics.ListAPIView):
    """GET /api/events/ - published, upcoming events with their shifts and
    how many spaces are left on each, for the public 'volunteer for a
    shift' section."""

    serializer_class = EventSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        from django.utils import timezone

        return Event.objects.filter(is_published=True, date__gte=timezone.localdate()).prefetch_related("shifts")


class ShiftSignupCreateView(generics.CreateAPIView):
    """POST /api/shifts/<shift_id>/signup/ - a volunteer offering to cover
    a specific shift. Rejected if the shift is already full."""

    serializer_class = ShiftSignupSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["shift"] = get_object_or_404(Shift, pk=self.kwargs["shift_id"])
        return context
