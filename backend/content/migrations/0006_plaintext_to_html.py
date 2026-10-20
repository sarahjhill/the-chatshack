"""The admin's body/description fields are now edited with a rich text
(WYSIWYG) editor, which stores HTML rather than plain text with blank
lines between paragraphs. This converts the plain text seeded by earlier
migrations into equivalent HTML (<p>one</p><p>two</p>...), so nothing
Scott already has looks different and it's ready to keep editing richly
in the new editor."""

from django.db import migrations
from django.utils.html import escape


def to_html(text: str) -> str:
    paragraphs = [p.strip() for p in text.split("\n\n") if p.strip()]
    return "".join(f"<p>{escape(p)}</p>" for p in paragraphs)


def convert_forward(apps, schema_editor):
    ContentBlock = apps.get_model("content", "ContentBlock")
    ListItem = apps.get_model("content", "ListItem")

    for block in ContentBlock.objects.exclude(body=""):
        block.body = to_html(block.body)
        block.save(update_fields=["body"])

    for item in ListItem.objects.exclude(description=""):
        item.description = to_html(item.description)
        item.save(update_fields=["description"])


def convert_backward(apps, schema_editor):
    # Not reversible in a lossless way (HTML -> plain text would need to
    # strip tags) - left as a no-op, matching the forward direction's
    # intent of a one-way upgrade.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0005_page_based_sections"),
    ]

    operations = [
        migrations.RunPython(convert_forward, convert_backward),
    ]
