"""Shared helper for the 'notify Scott by email whenever something comes in'
behaviour used by both the submissions app and the volunteering app."""

from django.conf import settings
from django.core.mail import send_mail


def notify(subject: str, message: str) -> None:
    """Send a plain-text notification email to NOTIFY_EMAIL. Never raises -
    a failed/misconfigured email shouldn't stop a form submission from
    saving, so this logs the error path quietly instead of propagating it.
    """
    try:
        send_mail(
            subject=f"[The ChatShack] {subject}",
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.NOTIFY_EMAIL],
            fail_silently=True,
        )
    except Exception:
        # Email is a nice-to-have on top of the data being saved in the
        # database/admin - never let an email problem break a submission.
        pass
