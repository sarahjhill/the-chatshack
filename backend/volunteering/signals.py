from django.db.models.signals import post_save
from django.dispatch import receiver

from .emailing import notify
from .models import ShiftSignup


@receiver(post_save, sender=ShiftSignup)
def notify_new_shift_signup(sender, instance, created, **kwargs):
    if not created:
        return
    shift = instance.shift
    notify(
        "New volunteer shift sign-up",
        (
            f"{instance.volunteer_name} has offered to cover a shift:\n\n"
            f"Event: {shift.event.title} ({shift.event.date:%d %b %Y})\n"
            f"Shift: {shift.label}, {shift.start_time:%H:%M}-{shift.end_time:%H:%M}\n"
            f"Spaces left on this shift now: {shift.spaces_left}\n\n"
            f"Volunteer email: {instance.email}\n"
            f"Volunteer phone: {instance.phone or '(not given)'}\n\n"
            f"Message:\n{instance.message or '(none)'}"
        ),
    )
