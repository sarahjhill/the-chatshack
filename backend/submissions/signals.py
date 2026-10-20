from django.db.models.signals import post_save
from django.dispatch import receiver

from .emailing import notify
from .models import ContactMessageSubmission, FirstContactSubmission, PartnerApplicationSubmission, SuggestionSubmission


@receiver(post_save, sender=ContactMessageSubmission)
def notify_new_contact_message(sender, instance, created, **kwargs):
    if not created:
        return
    notify(
        "New contact message",
        f"From: {instance.name or 'Anonymous'}\nEmail: {instance.email or '(not given)'}\n\n{instance.message}",
    )


@receiver(post_save, sender=SuggestionSubmission)
def notify_new_suggestion(sender, instance, created, **kwargs):
    if not created:
        return
    notify(
        "New community suggestion",
        f"From: {instance.name or 'Anonymous'}\nEmail: {instance.email or '(not given)'}\n\n{instance.message}",
    )


@receiver(post_save, sender=FirstContactSubmission)
def notify_new_first_contact(sender, instance, created, **kwargs):
    if not created:
        return
    notify(
        "New First Contact form submission",
        (
            f"Name: {instance.name or '(not given)'}\n"
            f"Email: {instance.email or '(not given)'}\n"
            f"Phone: {instance.phone or '(not given)'}\n"
            f"Preferred contact: {instance.preferred_contact_method or '(not given)'}\n\n"
            f"Message:\n{instance.message or '(none)'}"
        ),
    )


@receiver(post_save, sender=PartnerApplicationSubmission)
def notify_new_partner_application(sender, instance, created, **kwargs):
    if not created:
        return
    notify(
        "New partner application",
        (
            f"Organisation: {instance.organisation_name}\n"
            f"Contact: {instance.contact_name}\n"
            f"Email: {instance.email}\n"
            f"Phone: {instance.phone or '(not given)'}\n\n"
            f"Services offered:\n{instance.services_offered}\n\n"
            f"Message:\n{instance.message or '(none)'}"
        ),
    )
