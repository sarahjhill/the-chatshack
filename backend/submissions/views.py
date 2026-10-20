from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import ContactMessageSubmission, FirstContactSubmission, PartnerApplicationSubmission, SuggestionSubmission
from .serializers import (
    ContactMessageSubmissionSerializer,
    FirstContactSubmissionSerializer,
    PartnerApplicationSubmissionSerializer,
    SuggestionSubmissionSerializer,
)


class ContactMessageCreateView(generics.CreateAPIView):
    """POST /api/contact/ - the general Contact Us page form. Anonymous and
    open to anyone - no auth required."""

    queryset = ContactMessageSubmission.objects.all()
    serializer_class = ContactMessageSubmissionSerializer
    permission_classes = [AllowAny]


class SuggestionCreateView(generics.CreateAPIView):
    """POST /api/suggestions/ - the Community page's 'Tell us what's
    needed' box. Anonymous and open to anyone - no auth required."""

    queryset = SuggestionSubmission.objects.all()
    serializer_class = SuggestionSubmissionSerializer
    permission_classes = [AllowAny]


class FirstContactCreateView(generics.CreateAPIView):
    """POST /api/first-contact/ - the Support page's optional First Contact
    form."""

    queryset = FirstContactSubmission.objects.all()
    serializer_class = FirstContactSubmissionSerializer
    permission_classes = [AllowAny]


class PartnerApplicationCreateView(generics.CreateAPIView):
    """POST /api/partner-applications/ - organisations applying via the
    Partners & Resources page."""

    queryset = PartnerApplicationSubmission.objects.all()
    serializer_class = PartnerApplicationSubmissionSerializer
    permission_classes = [AllowAny]
