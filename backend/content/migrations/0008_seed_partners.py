from django.db import migrations

# The partners already live on the site, hardcoded in
# src/components/PartnerLogos.tsx - seeded here so they show up in admin
# straight away instead of Scott having to re-type them all from scratch.
# logo_url points at the existing image already built into the frontend
# (in public/images/partners/), since these were never uploaded via admin.
PARTNERS = [
    {
        "name": "sarahjhill.com",
        "logo_url": "/images/partners/sarahjhill.webp",
        "url": "https://sarahjhill.com",
        "link_label": "sarahjhill.com",
        "intro": "Websites and digital tools for Cardiff charities, community groups and small "
        "businesses. Sarah built The ChatShack's website to help more people find support.",
        "order": 0,
    },
    {
        "name": "Tesco Extra Gabalfa",
        "logo_url": "/images/partners/tesco-extra.svg",
        "url": "",
        "link_label": "",
        "intro": "Hosts our Tuesday evening groups in the Community Space upstairs. Come along "
        "for a coffee, some food and a chat.",
        "order": 1,
    },
    {
        "name": "Behind Every Mask (B.E.M.)",
        "logo_url": "/images/partners/behind-every-mask.webp",
        "url": "https://bem-crisis.app/emergency",
        "link_label": "bem-crisis.app",
        "intro": "A crisis referral and wellbeing app connecting people of any age, anywhere in "
        "the world, with support. Compassion without judgement.",
        "order": 2,
    },
    {
        "name": "Many Downs, Time to Get Up",
        "logo_url": "/images/partners/many-downs.webp",
        "url": "https://www.facebook.com/photo/?fbid=749484210552232&set=a.412773190890004",
        "link_label": "Facebook",
        "intro": "A Cardiff mental health and suicide prevention community group: tackling "
        "stigma, signposting, support and events.",
        "order": 3,
    },
    {
        "name": "People Against Intentional Neglect (P.A.I.N)",
        "logo_url": "/images/partners/pain.webp",
        "url": "https://www.peopleagainstintentionalneglect.org",
        "link_label": "Visit website",
        "intro": "A support and advocacy network standing up for people who've been let down by "
        "the systems meant to protect them.",
        "order": 4,
    },
    {
        "name": "Harmony Harbour UK",
        "logo_url": "/images/partners/harmony-harbour.webp",
        "url": "https://www.harmonyharbour.co.uk",
        "link_label": "harmonyharbour.co.uk",
        "intro": "A suicide prevention and mental health support service, working alongside "
        "B.E.M. and P.A.I.N - a safe harbour for brighter tomorrows.",
        "order": 5,
    },
]


def seed_partners(apps, schema_editor):
    Partner = apps.get_model("content", "Partner")
    if Partner.objects.exists():
        return
    for data in PARTNERS:
        Partner.objects.create(is_active=True, **data)


def noop(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0007_partner"),
    ]

    operations = [
        migrations.RunPython(seed_partners, noop),
    ]
