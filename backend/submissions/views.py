from rest_framework import generics
from rest_framework.permissions import AllowAny

from .models import (
    ContactMessageSubmission,
    FirstContactSubmission,
    ImprovementFeedbackSubmission,
    PartnerApplicationSubmission,
    SleepOutInterestSubmission,
    SuggestionSubmission,
    VolunteerApplicationSubmission,
)
from .serializers import (
    ContactMessageSubmissionSerializer,
    FirstContactSubmissionSerializer,
    ImprovementFeedbackSubmissionSerializer,
    PartnerApplicationSubmissionSerializer,
    SleepOutInterestSubmissionSerializer,
    SuggestionSubmissionSerializer,
    VolunteerApplicationSubmissionSerializer,
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


class ImprovementFeedbackCreateView(generics.CreateAPIView):
    """POST /api/improvement-feedback/ - the Contact Us page's 'Tell us
    how we can improve' box. Anonymous and open to anyone - no auth
    required."""

    queryset = ImprovementFeedbackSubmission.objects.all()
    serializer_class = ImprovementFeedbackSubmissionSerializer
    permission_classes = [AllowAny]


class SleepOutInterestCreateView(generics.CreateAPIView):
    """POST /api/sleep-out-interest/ - the 'Register your interest' popup
    on the Events page's Sleep Out to Help Out section. Anonymous and open
    to anyone - no auth required."""

    queryset = SleepOutInterestSubmission.objects.all()
    serializer_class = SleepOutInterestSubmissionSerializer
    permission_classes = [AllowAny]


class VolunteerApplicationCreateView(generics.CreateAPIView):
    """POST /api/volunteer-applications/ - the 'Apply to volunteer' form in
    the Get Involved section of the Our Community page."""

    queryset = VolunteerApplicationSubmission.objects.all()
    serializer_class = VolunteerApplicationSubmissionSerializer
    permission_classes = [AllowAny]
