from django.db import migrations


STARTER_ITEMS = [
    {
        "name": "Sleeping bag",
        "description": "Keeps someone warm and dry overnight.",
        "price": "25.00",
        "display_order": 1,
    },
    {
        "name": "Tent",
        "description": "A safe, dry place to shelter.",
        "price": "60.00",
        "display_order": 2,
    },
    {
        "name": "Hot meal",
        "description": "A warm meal when it's needed most.",
        "price": "5.00",
        "display_order": 3,
    },
    {
        "name": "Hat",
        "description": "Keeps someone warm through the cold months.",
        "price": "8.00",
        "display_order": 4,
    },
]


def seed_items(apps, schema_editor):
    Item = apps.get_model("shop", "Item")
    for data in STARTER_ITEMS:
        Item.objects.get_or_create(name=data["name"], defaults=data)


def remove_seeded_items(apps, schema_editor):
    Item = apps.get_model("shop", "Item")
    Item.objects.filter(name__in=[d["name"] for d in STARTER_ITEMS]).delete()


class Migration(migrations.Migration):

    dependencies = [
        ("shop", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_items, remove_seeded_items),
    ]
