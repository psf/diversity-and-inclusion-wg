from datetime import datetime
import json
from pathlib import Path

AUTHOR = "Python D&I Workgroup"
SITENAME = "Python Diversity & Inclusion Workgroup"
SITEURL = ""
CURRENT_YEAR = datetime.now().year

PATH = "content"
PAGE_PATHS = ["pages"]
ARTICLE_PATHS = ["articles"]

TIMEZONE = "UTC"
DEFAULT_LANG = "en"

THEME = "theme"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ("Python.org", "https://www.python.org/"),
    ("PSF", "https://www.python.org/psf/"),
)

# Social
SOCIAL = (
    ("twitter", "https://twitter.com/ThePSF"),
    ("github", "https://github.com/python"),
)

DEFAULT_PAGINATION = 10

# Page URLs
PAGE_URL = '{slug}.html'
PAGE_SAVE_AS = '{slug}.html'

# Static paths
STATIC_PATHS = ["images", "extra"]
EXTRA_PATH_METADATA = {
    "extra/favicon.ico": {"path": "favicon.ico"},
}

# Structured data available in all templates

BELIEFS = [
    {
        "title": "Python is for everyone.",
        "description": (
            'But "everyone" only becomes real when we actively work to include '
            "people who have historically been left out of tech spaces."
        ),
    },
    {
        "title": "Diversity",
        "description": (
            "Diversity is about who's in the room—the full range of backgrounds, "
            "identities, experiences, and perspectives that make our community rich."
        ),
    },
    {
        "title": "Inclusion",
        "description": (
            "Inclusion is about what happens once you're here—whether you can "
            "participate fully, be heard, grow, and thrive."
        ),
    },
]

BELIEFS_FOOTER = (
    "We exist to move Python from aspiration to action on both fronts."
)

VALUES = [
    {
        "title": "Inclusion",
        "description": "We actively create space for marginalized or overlooked voices.",
    },
    {
        "title": "Empathy",
        "description": "We listen first. We seek to understand experiences different from our own.",
    },
    {
        "title": "Respect",
        "description": "We treat every community member with dignity, regardless of their background or experience level.",
    },
    {
        "title": "Integrity",
        "description": "We're honest about where we are, where we fall short, and what it takes to improve.",
    },
    {
        "title": "Equity",
        "description": "We recognize that equal treatment isn't always fair treatment—some communities need more support to participate fully.",
    },
    {
        "title": "Belonging",
        "description": "Our goal isn't just to invite people in, but to make sure they want to stay.",
    },
]

WHAT_WE_DO = [
    {
        "title": "Global Community Mapping",
        "headline": "Mapping the Global Python Community",
        "subheadline": "Before we can serve the worldwide Python community, we need to understand it. This initiative creates a comprehensive picture of Python communities across the globe.",
        "description": "We're building a comprehensive picture of Python communities around the world—who they are, where they are, and what they need to thrive.",
        "link_text": "Learn more about Community Mapping",
        "link_url": "global-community-mapping.html",
    },
    {
        "title": "Community Organizer Kit",
        "headline": "The Community Organizer Kit",
        "subheadline": "Practical tools and resources to help you build inclusive Python communities—no matter where you are or how much experience you have.",
        "description": "Practical resources, templates, and guides to help local Python organizers build inclusive events and communities from the ground up.",
        "link_text": "Explore the Organizer Kit",
        "link_url": "community-organizer-kit.html",
    },
    {
        "title": "Community Surveys & Research",
        "headline": "Understanding Our Community Through Data",
        "subheadline": "We can't fix what we don't measure. Our surveys and research help us understand who's in the Python community, who's missing, and what barriers exist.",
        "description": "Data-driven insights into who makes up our community, what barriers they face, and how we can do better.",
        "link_text": "See Our Research",
        "link_url": "community-surveys-research.html",
    },
]

IMPACT_ITEMS = [
    {
        "title": "Grants Equity",
        "description": "In 2022, only 2% of PSF grants went to Asia. By 2023, that number grew to 15%. We advocated for geographic equity in grant distribution, and it's working.",
    },
    {
        "title": "Global Representation",
        "description": "In 2020, East and Southeast Asia had almost no representation on the PSF Board. Today, 3 of 12 board members come from these regions.",
    },
    {
        "title": "Community Insights",
        "description": "Our Asia-Pacific survey revealed that 73% of respondents didn't know what the PSF does, and 88% had never voted in a board election. This data is driving real change.",
    },
    {
        "title": "New Organizations",
        "description": "The insights from our work directly inspired the founding of the Python Asia Organization (PAO) in 2024—creating permanent infrastructure for regional community building.",
    },
]

GET_INVOLVED = {
    "start_small": [
        "Follow our updates on the PSF blog",
        "Commit to our code of conduct",
        "Take our community survey when it launches",
        "Code of Conduct - the importance of it",
    ],
    "go_deeper": [
        "Join our Slack channel to connect with members",
        "Attend our monthly meetings (open to observers)",
        "Contribute to the Community Organizer Kit",
    ],
    "become_member": [
        "We welcome new workgroup members who can commit to regular participation. Members attend monthly meetings, contribute to initiatives, and help shape recommendations to the PSF Board.",
    ],
}

# Load member data from individual JSON files
MEMBERS_DIR = Path(__file__).parent / "members"
MEMBERS = []
if MEMBERS_DIR.exists():
    for f in sorted(MEMBERS_DIR.glob("*.json")):
        with open(f, "r", encoding="utf-8") as fh:
            MEMBERS.append(json.load(fh))

# Derive leadership from member roles
LEADERSHIP_MEMBERS = [m for m in MEMBERS if m.get("role")]

# Group active members by region
MEMBERS_BY_REGION = {}
for m in MEMBERS:
    if m.get("active") and not m.get("role"):
        region = m.get("region") or "Other"
        MEMBERS_BY_REGION.setdefault(region, []).append(m)

PAST_MEMBERS = [m for m in MEMBERS if not m.get("active")]

# Fallback placeholder image helper
MEMBER_PLACEHOLDER = "https://picsum.photos/seed/{seed}/400/500"

LEADERSHIP = {
    "chair": "Georgi Ker",
    "co_chair": "Nathan Bransby",
    "staff_contact": "Marie Nordin",
}

CONNECT = [
    {"label": "Email", "value": "diversity-inclusion-wg@python.org", "url": "mailto:diversity-inclusion-wg@python.org", "icon": "fa-solid fa-envelope"},
    {"label": "Slack", "value": "#diversity-inclusion (PSF Discord)", "url": "#", "icon": "fa-brands fa-slack"},
    {"label": "Reports", "value": "Read our updates to the PSF Board", "url": "#", "icon": "fa-solid fa-file-lines"},
]

FOOTER_CTA = {
    "headline": "The Python community is stronger when it includes everyone.",
    "subheadline": "Will you help us build it?",
    "buttons": [
        {"text": "Get Involved", "url": "#", "style": "primary"},
        {"text": "Read Our Charter", "url": "charter.html", "style": "secondary"},
    ],
}

# Uncomment following line if you want document-relative URLs when developing
# RELATIVE_URLS = True
