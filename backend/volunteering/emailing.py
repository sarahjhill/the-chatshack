from django.conf import settings
from django.core.mail import send_mail


def notify(subject: str, message: str) -> None:
    try:
        send_mail(
            subject=f"[The ChatShack] {subject}",
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.NOTIFY_EMAIL],
            fail_silently=True,
        )
    except Exception:
        pass
