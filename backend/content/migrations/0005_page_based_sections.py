"""Restructures ContentBlock and ListItem so they belong to a PageHero (one
page) via a foreign key, instead of a loose `page` text field - this lets
every section/card for a page be edited together as inlines under that
page in admin (one screen per page), instead of hunting through separate
flat lists. Existing rows are matched up to their page automatically; no
content is lost or changed."""

from django.db import migrations, models
import django.db.models.deletion


CONTENT_BLOCK_SECTION_CHOICES = [
    ("why_we_exist", "About Us · Why we exist"),
    ("ethos", "About Us · Our ethos & mission"),
    ("founder_note", "About Us · Founder's note"),
    ("what_to_expect", "I Need Support · What to expect"),
    ("closing", "I Need Support · Closing message"),
    ("intro", "Our Community / Homeless Outreach · Intro"),
    ("how_groups_run", "Our Community · How our groups run"),
    ("suggestions_intro", "Our Community · Suggestions intro"),
    ("principle", "Partners & Resources · Our guiding principle"),
    ("homeless_support", "Partners & Resources · Homeless support team"),
    ("how_we_refer", "Partners & Resources · How we refer"),
    ("how_we_approach", "Homeless Outreach · How we approach people"),
    ("advocacy", "Homeless Outreach · Advocacy"),
    ("the_van", "Homeless Outreach · The Van caption"),
]

LIST_ITEM_SECTION_CHOICES = [
    ("who_we_are", "About Us · 'We listen / talk / signpost / connect' tags"),
    ("principles", "About Us · Core principles"),
    ("tags", "About Us · Small badge tags (SAFE SPACE, 18+, etc.)"),
    ("photo_strip", "About Us / Our Community · Photo strip"),
    ("how_we_help", "I Need Support · 'How we help' cards"),
    ("faqs", "I Need Support · FAQs"),
    ("included", "Our Community · 'Our community can include' list"),
    ("categories", "Partners & Resources · Signposting categories"),
    ("ethos", "Homeless Outreach · Outreach ethos list"),
    ("ways", "Get Involved · Ways to get involved"),
    ("safer_recruitment", "Get Involved · Safer recruitment note"),
]


def link_to_hero(apps, schema_editor):
    ContentBlock = apps.get_model("content", "ContentBlock")
    ListItem = apps.get_model("content", "ListItem")
    PageHero = apps.get_model("content", "PageHero")

    heroes_by_page = {hero.page: hero for hero in PageHero.objects.all()}

    for block in ContentBlock.objects.all():
        hero = heroes_by_page.get(block.page)
        if hero:
            block.hero_id = hero.pk
            block.save(update_fields=["hero"])

    for item in ListItem.objects.all():
        hero = heroes_by_page.get(item.page)
        if hero:
            item.hero_id = hero.pk
            item.save(update_fields=["hero"])


def unlink_from_hero(apps, schema_editor):
    # Reverse: nothing to do, the `page` field is restored by RemoveField's
    # own reverse operation with its data simply blank again.
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0004_seed_page_content"),
    ]

    operations = [
        migrations.AddField(
            model_name="contentblock",
            name="hero",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="blocks",
                to="content.pagehero",
                verbose_name="page",
            ),
        ),
        migrations.AddField(
            model_name="listitem",
            name="hero",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="items",
                to="content.pagehero",
                verbose_name="page",
            ),
        ),
        migrations.RunPython(link_to_hero, unlink_from_hero),
        migrations.AlterField(
            model_name="contentblock",
            name="hero",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="blocks",
                to="content.pagehero",
                verbose_name="page",
            ),
        ),
        migrations.AlterField(
            model_name="listitem",
            name="hero",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="items",
                to="content.pagehero",
                verbose_name="page",
            ),
        ),
        migrations.RemoveField(model_name="contentblock", name="page"),
        migrations.RemoveField(model_name="listitem", name="page"),
        migrations.AlterField(
            model_name="contentblock",
            name="section",
            field=models.CharField(choices=CONTENT_BLOCK_SECTION_CHOICES, max_length=50),
        ),
        migrations.AlterField(
            model_name="listitem",
            name="section",
            field=models.CharField(choices=LIST_ITEM_SECTION_CHOICES, max_length=50),
        ),
        migrations.AlterModelOptions(
            name="contentblock",
            options={
                "ordering": ["hero", "section", "order"],
                "verbose_name": "Page section",
                "verbose_name_plural": "Page sections",
            },
        ),
        migrations.AlterModelOptions(
            name="listitem",
            options={
                "ordering": ["hero", "section", "order"],
                "verbose_name": "Card / list item",
                "verbose_name_plural": "Cards & list items",
            },
        ),
        migrations.AlterModelOptions(
            name="pagehero",
            options={"ordering": ["page"], "verbose_name": "Page", "verbose_name_plural": "Pages"},
        ),
    ]
