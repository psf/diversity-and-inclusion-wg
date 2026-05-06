# Diversity and Inclusion Working Group

🌐 Visit our [webpage](https://psf.github.io/diversity-and-inclusion-wg/) for vision, mission and updates.

🤝 This website is managed by PSF's Diversity and Inclusion Workgroup. If you would like to join as an official member, read more [here](https://wiki.python.org/psf/DiversityandInclusionWG).

⤴️ It is currently hosted on GitHub pages.

✨ This website welcomes pull requests from anyone in the community.

---

## Technology Stack

| Component | Technology |
|-----------|------------|
| Static Site Generator | [Pelican](https://getpelican.com/) |
| Package Manager | [uv](https://docs.astral.sh/uv/) |
| Templating | Jinja2 |
| CSS Framework | Tailwind CSS (CDN) |
| Icons | Font Awesome 6.4.0 |

---

## Local Development

### Install dependencies

```bash
uv sync
source .venv/bin/activate
```

### Build the site

```bash
pelican content
```

This generates the site into the `output/` directory.

### Preview locally

```bash
python -m http.server -d output 8000
```

Then open http://localhost:8000.

### Auto-reload during development

```bash
pelican --autoreload --listen content
```

---

## Adding or Updating Members

Member data lives in individual JSON files inside the `members/` directory. The site automatically reads all `.json` files from this folder.

### Create a new member

Create a new file at `members/{firstname-lastname}.json`:

```json
{
  "name": "Full Name",
  "slug": "full-name",
  "role": "",
  "region": "Asia",
  "active": true,
  "image": "",
  "affiliation": "Company or Organization",
  "socials": {
    "twitter": "https://twitter.com/username",
    "github": "https://github.com/username",
    "linkedin": "https://linkedin.com/in/username",
    "website": "https://example.com",
    "mastodon": ""
  },
  "bio": "Short optional bio"
}
```

### Field reference

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Full name | `"Ada Lovelace"` |
| `slug` | URL-friendly identifier | `"ada-lovelace"` |
| `role` | Leadership role (leave empty for regular members) | `"Chair"`, `"Co-Chair"`, `"PSF Staff Contact"` |
| `region` | Geographic region | `"Asia"`, `"Europe"`, `"Africa"`, `"North America"`, `"South America"`, `"Oceania"`, `"Middle East"` |
| `active` | `true` for current members, `false` for past members | `true` |
| `image` | URL to member photo (see below) | `"https://..."` |
| `affiliation` | Company, organization, or university | `"PSF"` |
| `socials` | Object with social media URLs | See example above |
| `bio` | Optional short biography | `"Pythonista since 2010..."` |

### Moving a member to "Past Members"

Set `"active": false` in their JSON file. The site automatically moves them to the Past Members section.

### Adding social links

Only include links that exist. Empty strings (`""`) are ignored automatically.

Supported platforms: Twitter/X, GitHub, LinkedIn, personal website, Mastodon.

---

## Member Images

There are three ways to provide a member photo:

### Option 1: Direct image URL

Upload the image somewhere (e.g., GitHub user content, Imgur, your own server) and paste the URL:

```json
{
  "image": "https://avatars.githubusercontent.com/u/1234567?v=4"
}
```

### Option 2: Gravatar

If the member has a Gravatar account, use their email hash:

```json
{
  "image": "https://www.gravatar.com/avatar/YOUR_MD5_HASH?s=400&d=identicon"
}
```

# To use Gravatar, generate the MD5 hash of the email:
echo -n "user@example.com" | md5sum
# Then construct the URL yourself:
# https://www.gravatar.com/avatar/YOUR_MD5_HASH?s=400d=identicon

### Option 3: Placeholder (default)

Leave `"image": ""` empty. The site automatically generates a consistent placeholder using `picsum.photos` seeded with the member's slug.

---

## Adding Pages

Pages are Markdown files in `content/pages/`.

### Simple page

Create `content/pages/my-page.md`:

```markdown
Title: My Page
Slug: my-page
Headline: Page Headline
Subheadline: A short description of this page.
Template: initiative

Your content here. You can use Markdown or embed HTML with Tailwind classes.
```

### Link to the new page

Update `pelicanconf.py` or add a link in templates to point to `my-page.html`.

---

## Project Structure

```
.
├── content/
│   └── pages/           # Markdown page sources
├── members/             # Individual member JSON files
├── theme/
│   ├── static/
│   │   └── images/      # Static images (logo, etc.)
│   └── templates/       # Jinja2 templates
├── output/              # Generated site (gitignored)
├── pelicanconf.py       # Site configuration & data
└── README.md            # This file
```

---

## Deployment

The site is deployed to GitHub Pages. To deploy:

1. Build: `pelican content -s publishconf.py`
2. Push the `output/` contents to the GitHub Pages branch.

---

## Questions?

Ask for help in the Diversity and Inclusion workgroup - Python Software Foundation Slack (thepsf.slack.com) in the `#/diversity-and-inclusion` channel.

