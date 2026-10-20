"""Seeds PageHero / ContentBlock / ListItem with the site's current real
copy, so switching each page over to the API doesn't change anything
visually on day one. Image fields are deliberately left blank here - the
React site keeps using its existing built-in photo for anything with no
uploaded image, and Scott can replace individual photos from admin
whenever he's ready, one at a time."""

from django.db import migrations


HEROES = [
    {
        "page": "about",
        "eyebrow": "Who we are",
        "title": "About The ChatShack",
        "subtitle": "People should be treated as people first, not problems to be solved.",
    },
    {
        "page": "support",
        "eyebrow": "You are not alone",
        "title": "I Need Support",
        "subtitle": "The ChatShack aims to be an accessible first point of contact for anyone experiencing mental health, wellbeing or related life difficulties.",
    },
    {
        "page": "community",
        "eyebrow": "More than a group",
        "title": "Our Community",
        "subtitle": "The ChatShack isn't just about sitting in a room and talking.",
    },
    {
        "page": "partners",
        "eyebrow": "We don't have to do it all ourselves",
        "title": "Partners & Resources",
        "subtitle": "Building a community of like-minded communities.",
    },
    {
        "page": "homeless_outreach",
        "eyebrow": "Taking support to people",
        "title": "Homeless Mental Health Support Team",
        "subtitle": "A lack of housing should not mean a lack of access to mental health support.",
    },
    {
        "page": "get_involved",
        "eyebrow": "Join us",
        "title": "Get Involved",
        "subtitle": "However much time you have, there's a way to help The ChatShack.",
    },
    {
        "page": "contact",
        "eyebrow": "Get in touch",
        "title": "Contact Us",
        "subtitle": "There's no such thing as a daft question - reach out whenever you're ready.",
    },
]

BLOCKS = [
    # --- About --------------------------------------------------------
    {
        "page": "about", "section": "why_we_exist", "order": 0,
        "heading": "Why The ChatShack exists",
        "body": (
            "There's a real gap in the system - not in treatment that doesn't exist, but in treatment "
            "that doesn't come fast enough. Three months' wait isn't help when you need someone today.\n\n"
            "The ChatShack is run by people who've been on the other side of that gap - who've been fobbed "
            "off, misunderstood, and left to sit in A&E with nowhere else to go. We know the stumbling "
            "blocks because we've hit them ourselves.\n\n"
            "So we're your first point of call. You can ring us, talk to us, and we'll advocate for the "
            "help you actually need - not just a plaster on the problem, but real change, built from the "
            "bottom up. When everything else has failed, we aim to still be there."
        ),
        "link_text": "Get involved", "link_url": "/get-involved",
    },
    {
        "page": "about", "section": "ethos", "order": 0,
        "heading": "Our ethos & mission",
        "body": (
            "We're not here to replace the NHS, doctors, therapists or other professional services. We're "
            "here to help people find their way through what can often feel like a very complicated "
            "system. We're ordinary people supporting ordinary people.\n\n"
            "We listen. We talk. We signpost. We connect.\n\n"
            "And when someone needs more specialist support, we work with our Partners & Resources "
            "Directory to try to connect that person with the right organisation, professional or "
            "service. If we can help, we'll help. If we can't, we'll try to find somebody who can.\n\n"
            "Our mission is to provide an accessible first point of contact for adults experiencing mental "
            "health, wellbeing or related life difficulties - through peer-led support, listening, "
            "practical signposting, group and one-to-one support, peer mentoring, wellbeing activities, "
            "workshops, partner referrals and advocacy where appropriate. \"If someone needs help, we want "
            "them to know where to start.\""
        ),
    },
    {
        "page": "about", "section": "founder_note", "order": 0,
        "heading": "A note from Scott, founder of The ChatShack",
        "body": (
            "\"When I first thought about what The ChatShack could become, I wanted to create something "
            "simple - a place where people could come and talk, without judgement, without feeling like "
            "they had to explain themselves, and without being made to feel like a number.\"\n\n"
            "The ChatShack has grown from that simple idea into a peer-led mental health support community "
            "for people aged 18+, built around one very important principle:\n\n"
            "You don't have to wait until things become a crisis before asking for support.\n\n"
            "We want The ChatShack to be a 1st Point of Contact for anyone who needs somebody to talk to, "
            "some guidance, a little bit of support, or simply a safe place to be around other people. And "
            "importantly - you do NOT have to have a diagnosed mental health issue to use The ChatShack.\n\n"
            "- Scott, Founder"
        ),
    },
    # --- Support --------------------------------------------------------
    {
        "page": "support", "section": "what_to_expect", "order": 0,
        "heading": "What to expect",
        "body": (
            "Reaching out can be the hardest part. Where appropriate and where available, we help people "
            "navigate towards same-day support and treatment. If we can't provide what you need ourselves, "
            "our Directory of Partners & Resources helps connect you with organisations who may be able "
            "to.\n\n"
            "One-to-one peer support has clear boundaries - a peer supporter is not a therapist, "
            "psychiatrist, GP, crisis service or emergency responder. They will listen, provide appropriate "
            "emotional support, signpost you, and encourage professional help where it's needed.\n\n"
            "Our confidentiality policy explains what you tell us stays between us, with rare, clearly "
            "explained exceptions."
        ),
    },
    {
        "page": "support", "section": "closing", "order": 0,
        "heading": "It's ok not to be ok. It's not ok to stay there.",
        "body": "IN AN EMERGENCY OR IMMEDIATE DANGER, PLEASE CALL 999 or go to your nearest A&E department.",
        "link_text": "REACH OUT TO US", "link_url": "https://facebook.com/TheChatShack",
    },
    # --- Community ------------------------------------------------------
    {
        "page": "community", "section": "intro", "order": 0,
        "heading": "Real people, real events, real community.",
        "body": "",
    },
    {
        "page": "community", "section": "how_groups_run", "order": 0,
        "heading": "How our groups run",
        "body": (
            "Every group has a named facilitator, a known venue, a clear attendance process and agreed "
            "ground rules. We ask everyone to respect others, allow people to speak, avoid discriminatory "
            "behaviour, and understand that confidentiality is expected - though it can't always be "
            "guaranteed where there's a safeguarding concern. You're always free to leave a session if "
            "you're uncomfortable."
        ),
        "link_text": "See how we keep people safe", "link_url": "/safeguarding",
    },
    {
        "page": "community", "section": "suggestions_intro", "order": 0,
        "heading": "Tell us what's needed",
        "body": (
            "This community is shaped by the people in it. If there's a group, activity or type of support "
            "you'd find helpful - or something about an existing session that isn't working for you - we "
            "want to hear it. You don't need to give your name."
        ),
    },
    # --- Partners --------------------------------------------------------
    {
        "page": "partners", "section": "intro", "order": 0,
        "heading": "Support Built Around People",
        "body": (
            "At The ChatShack, we believe that finding the right support should never be another battle "
            "for someone who is already struggling. That's why we've personally sourced and built "
            "relationships with our Partners & Resources, taking the time to identify services, "
            "organisations, professionals and community groups that can make a genuine difference to "
            "people's lives.\n\n"
            "No two people experience life the same way, and no single approach works for everyone - from "
            "therapists and talking therapies to outdoor activities, gentle social groups, peer support and "
            "opportunities to build friendships, we want to offer people a range of pathways towards "
            "feeling better, rebuilding confidence and finding a sense of belonging. For some, the first "
            "step might be professional therapy; for others, it might simply be a coffee, a group, getting "
            "outdoors or learning something new."
        ),
    },
    {
        "page": "partners", "section": "principle", "order": 0,
        "heading": "",
        "body": (
            "Our model is built around one simple principle: if The ChatShack can't provide the support "
            "someone needs directly, we'll do our best to connect them with a partner who can."
        ),
    },
    {
        "page": "partners", "section": "homeless_support", "order": 0,
        "heading": "Our Homeless Support Team - Taking Support to Those Who Need It Most",
        "body": (
            "People experiencing homelessness or rough sleeping can face multiple barriers to accessing "
            "mental health services, practical assistance and opportunities to rebuild their lives. Through "
            "our Partners & Resources, we're building a joined-up network that recognises the whole "
            "person, not simply their circumstances - homelessness charities, outreach organisations, "
            "accommodation and housing support, mental health professionals, wellbeing providers, practical "
            "assistance networks and community organisations who can help people access the right support "
            "at the right time.\n\n"
            "Working alongside organisations such as our partners Many Downs and Time to Get Up, we want "
            "to help ensure that people who may feel forgotten, unheard or disconnected from society have "
            "someone willing to listen, advocate for them and help them navigate the support available. A "
            "lack of a home should never mean a lack of support, and nobody should have to face their "
            "circumstances alone."
        ),
    },
    {
        "page": "partners", "section": "how_we_refer", "order": 0,
        "heading": "How we refer",
        "body": (
            "A referral considers your needs, your preferences where practicable, urgency, how easy a "
            "service is to reach and access, eligibility, and any safeguarding considerations. Our "
            "principle is a warm referral rather than a cold hand-off, wherever possible - we try to make "
            "the first step easier, not harder.\n\n"
            "We can also help you understand available services, prepare for appointments, and identify "
            "the right questions to ask - without ever impersonating a statutory service or making "
            "decisions on your behalf."
        ),
    },
    # --- Homeless Outreach -----------------------------------------------
    {
        "page": "homeless_outreach", "section": "intro", "order": 0,
        "heading": "",
        "body": (
            "Our Homeless Mental Health Support Team extends The ChatShack's peer-led model beyond the "
            "traditional community venue. Our team never describes people experiencing homelessness merely "
            "by their housing status."
        ),
    },
    {
        "page": "homeless_outreach", "section": "how_we_approach", "order": 0,
        "heading": "How we approach people",
        "body": (
            "Workers introduce themselves, explain who The ChatShack is and why they're there, ask whether "
            "someone wishes to talk, and respect a refusal without pressuring disclosure. The person "
            "remains in control wherever safety permits. Where practicable, outreach involves at least two "
            "workers, with check-in and emergency arrangements agreed before every deployment."
        ),
    },
    {
        "page": "homeless_outreach", "section": "advocacy", "order": 0,
        "heading": "Advocacy",
        "body": (
            "We may advocate for people who struggle to navigate services, have difficulty communicating "
            "with professionals, or need help understanding the options available to them - to help people "
            "have a voice, not to speak over them."
        ),
    },
    {
        "page": "homeless_outreach", "section": "the_van", "order": 0,
        "heading": "",
        "body": "The Van is the dream - taking access to those who need it, when they need it.",
        "link_text": "HELP US FUND THE VAN", "link_url": "/donate",
    },
]

ITEMS = [
    # --- About ------------------------------------------------------
    *[
        {"page": "about", "section": "who_we_are", "order": i, "title": t, "description": ""}
        for i, t in enumerate(["We listen.", "We talk.", "We signpost.", "We connect."])
    ],
    {"page": "about", "section": "principles", "order": 0, "title": "Dignity", "description": "Every person is entitled to be treated with dignity and respect."},
    {"page": "about", "section": "principles", "order": 1, "title": "Equality", "description": "No one should be disadvantaged because of who they are or their circumstances."},
    {"page": "about", "section": "principles", "order": 2, "title": "Choice", "description": "Where possible, people take part in decisions that affect them."},
    {"page": "about", "section": "principles", "order": 3, "title": "Empowerment", "description": "We support informed choices, rather than creating dependency."},
    {"page": "about", "section": "principles", "order": 4, "title": "Safeguarding", "description": "Safety takes priority where there is a serious concern about harm."},
    {"page": "about", "section": "principles", "order": 5, "title": "Partnership", "description": "We work constructively alongside statutory, clinical and community organisations."},
    *[
        {"page": "about", "section": "tags", "order": i, "title": t, "description": ""}
        for i, t in enumerate(["SAFE SPACE", "CONFIDENTIAL", "NON-JUDGEMENTAL", "PEER-LED", "18+", "NO FEE"])
    ],
    # --- Support ------------------------------------------------------
    {"page": "support", "section": "how_we_help", "order": 0, "title": "We listen", "description": "No judgement, no pressure to share more than you want to."},
    {"page": "support", "section": "how_we_help", "order": 1, "title": "We support", "description": "Peer support, groups, activities and one-to-one support."},
    {"page": "support", "section": "how_we_help", "order": 2, "title": "We signpost", "description": "Help finding the right professional service or treatment, where needed."},
    {"page": "support", "section": "how_we_help", "order": 3, "title": "We don't just help", "description": "We aim to change - not just get you through today, but towards something better."},
    {
        "page": "support", "section": "faqs", "order": 0,
        "title": "Do I have to have a diagnosed mental health issue to use The ChatShack?",
        "description": (
            "No - absolutely not. You don't need a diagnosed mental health condition to attend, and you "
            "don't even have to consider yourself to have a mental health problem. Maybe you're feeling "
            "lonely, you've had a difficult week, you're going through a stressful period, or you simply "
            "want a coffee and a chat. The ChatShack isn't somewhere you have to earn your place - you're "
            "welcome."
        ),
    },
    {
        "page": "support", "section": "faqs", "order": 1,
        "title": "Can I access therapy as soon as possible?",
        "description": (
            "Where appropriate, we will always try to help you access the right support as quickly as "
            "possible, including through our network of partners and resources. Where funding is "
            "available, we also want to help fund same-day therapy sessions when they're needed. We can't "
            "promise therapy immediately for everyone - availability, suitability and professional "
            "assessment can vary - but we can promise that we'll listen, take you seriously, and try to "
            "help you find the right route forward."
        ),
    },
    {
        "page": "support", "section": "faqs", "order": 2,
        "title": "What if I'm nervous about coming along?",
        "description": (
            "That's completely understandable - for some people, walking into a new group is one of the "
            "hardest parts. You don't have to tell everybody your life story straight away, and you don't "
            "have to speak if you don't want to. You can come along, have a coffee, sit down, listen, meet "
            "people and see what we're about, at your own pace. There is no pressure, and if groups aren't "
            "for you, talk to us about the other forms of support that may be available."
        ),
    },
    # --- Community ------------------------------------------------------
    *[
        {"page": "community", "section": "photo_strip", "order": i, "title": "", "description": alt}
        for i, alt in enumerate([
            "The ChatShack's Mindful Colouring Session",
            "The ChatShack's Mindful Colouring Session event",
            "The ChatShack team and volunteers",
            "The ChatShack's Sleep Out to Help Out fundraiser",
            "The ChatShack's Mindful Colouring Session",
        ])
    ],
    *[
        {"page": "community", "section": "included", "order": i, "title": t, "description": ""}
        for i, t in enumerate([
            "Men's groups", "Women's groups", "Walk & Talk sessions", "Peer mentoring",
            "1-to-1 peer support", "Wellbeing activities", "Stress-relief activities",
            "Community events", "Online community connection",
            "Support for people who may find traditional services difficult to access",
        ])
    ],
    # --- Partners ------------------------------------------------------
    *[
        {"page": "partners", "section": "categories", "order": i, "title": t, "description": ""}
        for i, t in enumerate([
            "Mental Health", "Therapy", "Wellbeing", "Physical Health",
            "Housing & Homelessness", "Financial Support", "Addiction & Recovery", "Community Groups",
        ])
    ],
    # --- Homeless Outreach -----------------------------------------------
    *[
        {"page": "homeless_outreach", "section": "ethos", "order": i, "title": t, "description": ""}
        for i, t in enumerate([
            "Treat people as human beings", "Avoid judgement", "Respect autonomy",
            "Recognise trauma and barriers to accessing services", "Provide listening and peer support",
            "Provide appropriate signposting", "Support access to treatment", "Advocate where appropriate",
            "Work alongside specialist homelessness organisations", "Build trust gradually",
        ])
    ],
    # --- Get Involved ------------------------------------------------------
    {"page": "get_involved", "section": "ways", "order": 0, "title": "Peer supporter or mentor", "description": "Share your own lived experience to support others, one-to-one or in groups."},
    {"page": "get_involved", "section": "ways", "order": 1, "title": "Group facilitator", "description": "Help run a session, with full training and ongoing supervision."},
    {"page": "get_involved", "section": "ways", "order": 2, "title": "Outreach volunteer", "description": "Join our Homeless Mental Health Support Team taking support out to where it's needed."},
    {"page": "get_involved", "section": "ways", "order": 3, "title": "Partner organisation", "description": "Work with us if you're a service, charity or professional in a related field."},
    {"page": "get_involved", "section": "ways", "order": 4, "title": "Fundraise or donate", "description": "Help fund same-day support for people who can't wait for a referral."},
    {"page": "get_involved", "section": "ways", "order": 5, "title": "Join in", "description": "Come along to a group, a Walk & Talk session, or a community event."},
    {
        "page": "get_involved", "section": "safer_recruitment", "order": 0,
        "title": "Safer recruitment",
        "description": (
            "Every role is assessed for its responsibilities and level of contact with the people we "
            "support, including whatever DBS checks, references, identity verification, safeguarding "
            "training and experience are appropriate to that role. No one takes on duties beyond what "
            "they've been trained and approved for."
        ),
    },
]


def seed(apps, schema_editor):
    PageHero = apps.get_model("content", "PageHero")
    ContentBlock = apps.get_model("content", "ContentBlock")
    ListItem = apps.get_model("content", "ListItem")

    for hero in HEROES:
        PageHero.objects.get_or_create(page=hero["page"], defaults=hero)

    for block in BLOCKS:
        ContentBlock.objects.get_or_create(
            page=block["page"], section=block["section"], order=block["order"], defaults=block
        )

    for item in ITEMS:
        ListItem.objects.get_or_create(
            page=item["page"], section=item["section"], order=item["order"], defaults=item
        )


def unseed(apps, schema_editor):
    apps.get_model("content", "PageHero").objects.all().delete()
    apps.get_model("content", "ContentBlock").objects.all().delete()
    apps.get_model("content", "ListItem").objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ("content", "0003_contentblock_listitem_pagehero_and_more"),
    ]

    operations = [
        migrations.RunPython(seed, unseed),
    ]
