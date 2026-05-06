# Agent Guide: diversity-and-inclusion-wg

> This file is intended for AI coding agents working on this project.
> The reader of this file is expected to know nothing about the project.

---

## Project Overview

This repository contains the website for the **Python Software Foundation's Diversity & Inclusion Workgroup**.

The site is currently hosted on **GitHub Pages** at:
`https://psf.github.io/diversity-and-inclusion-wg/`


1. **Work-in-progress migration**: A [Pelican](https://getpelican.com/) static site generator setup (`pelicanconf.py`, `publishconf.py`, `content/`, `theme/`) that is partially configured but not yet integrated into the deployment pipeline. The `output/` directory is empty and no build automation exists.

The theme is a paid licensed theme from https://shock-html.codings.dev/.

---

## Technology Stack

| Component | Technology | Version |
|-----------|------------|---------|
| Language | Python | >= 3.12 |
| Package Manager | `uv` | (lockfile: `uv.lock`) |
| Static Site Generator | Pelican | >= 4.12.0 |
| Markdown Parser | Python-Markdown | >= 3.10.2 |
| Templating | Jinja2 | (via Pelican) |
| Frontend CSS Framework | Tailwind CSS | CDN |
| Frontend Components | Custom components | Tailwind utilities |
| Frontend Fonts | Google Fonts (Inter) | — |
| Frontend Icons | Font Awesome 6.4.0 | CDN |

---

## Project Structure

```
.
├── content/
│   └── pages/
│       └── index.md          # Only content source (Markdown with Pelican metadata)
├── theme/
│   ├── static/
│   │   └── css/              # EMPTY — no stylesheet exists here yet
│   └── templates/
│       ├── base.html         # Base Jinja2 layout (header, footer, font/icon CDNs)
│       ├── home.html         # Homepage template (uses BELIEFS, VALUES, TEAM_MEMBERS)
│       ├── index.html        # Hardcoded static version of homepage (Jinja2 syntax but inline values)
│       └── page.html         # Generic page template
├── output/                   # Pelican build output (currently empty)
├── pelicanconf.py            # Pelican development configuration
├── publishconf.py            # Pelican production configuration
├── pyproject.toml            # Python project metadata and dependencies
├── uv.lock                   # uv lockfile for reproducible installs
├── main.py                   # Stub script (not connected to the site build)
└── README.md                 # Human-readable project description
```

### Key Files Explained

- **`pelicanconf.py`**: Defines site metadata (`SITENAME`, `AUTHOR`, `THEME = "theme"`), content paths (`PAGE_PATHS = ["pages"]`), and large data structures (`BELIEFS`, `VALUES`, `TEAM_MEMBERS`) that feed the Jinja2 templates. Feeds are disabled for development.
- **`publishconf.py`**: Imports everything from `pelicanconf.py`, sets a production `SITEURL`, enables Atom feeds, and sets `DELETE_OUTPUT_DIRECTORY = True`. **Note**: The `SITEURL` currently points to a placeholder domain (`diversity-and-inclusion-wg.example.com`).
- **`content/pages/index.md`**: The sole Markdown content file. Uses Pelican metadata (`Title`, `Slug`, `URL`, `Save_as`, `Template: home`) to render as the homepage.
- **`theme/templates/base.html`**: Custom Tailwind navbar, skip-to-content link, semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), ARIA labels, and responsive mobile menu. Loads Tailwind CSS from CDN.
- **`theme/templates/home.html`**: Data-driven homepage with custom Tailwind components. Dark/light alternating sections, gradient accents, and accessibility-compliant markup with proper heading hierarchy and ARIA attributes.

---

## Build and Development Commands

### Environment Setup

This project uses `uv` for dependency management.

```bash
# Install dependencies
uv sync

# Activate the virtual environment
source .venv/bin/activate
```

### Running the Pelican Site (Work-in-Progress)

```bash
# Generate the site into output/
pelican content

# Serve the output directory locally
python -m http.server -d output 8000

# Or use Pelican's built-in development server with auto-reload
pelican --autoreload --listen content
```

### Viewing the Current Deployment

Because the active site is the standalone `index.html` at the repository root, the README suggests this for local preview:

```bash
python -m http.server  # Serves from project root; index.html is the entry point
```

---

## Code Style Guidelines

- **Configuration language**: Python files (`pelicanconf.py`, `publishconf.py`) use standard Python conventions.
- **Template language**: Jinja2 HTML templates use 4-space indentation.
- **Data structures in config**: `BELIEFS`, `VALUES`, and `TEAM_MEMBERS` are plain Python lists and dicts defined in `pelicanconf.py`. They are injected into all templates.
- **Images**: Templates currently reference external images (hero image from `z-cdn-media.chatglm.cn` and team avatars from `picsum.photos`). These are placeholders.

---

## Testing Instructions

**There are no tests in this project.**

No test runner configuration, no test files, and no testing dependencies exist.

If you add tests, the project uses Python >= 3.12 and `uv`. A reasonable choice would be `pytest`.

---

## Deployment

- **Platform**: GitHub Pages
- **Current mechanism**: The repository root `index.html` is served directly by GitHub Pages.
- **No CI/CD**: There are no GitHub Actions workflows, no `Makefile`, and no automated build or deploy scripts.
- **Pelican output is not deployed**: The `output/` directory is empty and not part of the current Pages deployment.

### To deploy Pelican-generated output (future state)

You would typically:
1. Run `pelican content -s publishconf.py`
2. Copy the contents of `output/` to the branch or directory configured for GitHub Pages.

---

## Security Considerations

- The `.gitignore` file only ignores macOS system files (`.DS_Store`, etc.). It does **not** ignore Python cache (`__pycache__`, `*.pyc`), the `output/` directory, or `.venv/`.
- No secrets, API keys, or credentials are present in the repository.
- Several navigation and social links in the templates are set to `#` placeholders.
- The standalone `index.html` and templates load external resources from CDNs (Font Awesome, Google Fonts). Ensure these are acceptable for the project's content security policy if one is introduced.

---

## Known Issues & Observations

1. **Missing theme CSS**: `theme/templates/base.html` links to `css/style.css`, but `theme/static/css/` is empty. The Pelican build produces pages with broken styling unless CSS is added.
2. **Placeholder data**: `TEAM_MEMBERS` in `pelicanconf.py` uses placeholder names and `picsum.photos` avatars.
3. **Placeholder URLs**: `publishconf.py` uses `example.com`; many footer/nav links are `#`.
4. **Duplicate homepage template**: Both `home.html` and `index.html` exist in `theme/templates/`. `home.html` is data-driven;
5. **`main.py`**: This file is a stub (`print("Hello from diversity-and-inclusion-wg!")`) and is not used by the site build.
