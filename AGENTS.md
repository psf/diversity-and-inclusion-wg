# Agent Guide: diversity-and-inclusion-wg

> This file is intended for AI coding agents working on this project.
> The reader of this file is expected to know nothing about the project.

______________________________________________________________________

## Project Overview

This repository contains the website for the **Python Software Foundation's Diversity & Inclusion Workgroup**.

The site is currently hosted on **GitHub Pages** at:
`https://diversity.python.org`

1. **Work-in-progress migration**: A [Pelican](https://getpelican.com/) static site generator setup (`pelicanconf.py`, `publishconf.py`, `content/`, `theme/`) that is partially configured but not yet integrated into the deployment pipeline. The `output/` directory is empty and no build automation exists.

______________________________________________________________________

## Technology Stack

| Component              | Technology           | Version                                          |
| ---------------------- | -------------------- | ------------------------------------------------ |
| Language               | Python               | >= 3.14                                          |
| Package Manager        | `uv`                 | (lockfile: `uv.lock`)                            |
| Static Site Generator  | Pelican              | >= 4.12.0                                        |
| Markdown Parser        | Python-Markdown      | >= 3.10.2                                        |
| Templating             | Jinja2               | (via Pelican)                                    |
| Frontend CSS Framework | Tailwind CSS         | compiled via standalone CLI (`make css`)         |
| Frontend Components    | Custom components    | Tailwind utilities                               |
| Frontend Fonts         | Google Fonts (Inter) | CDN                                              |
| Frontend Icons         | Font Awesome         | 6.7.2 (self-hosted, `theme/static/fontawesome/`) |
| Linter/Formatter       | Ruff                 | (config in `pyproject.toml`)                     |
| Local checks           | `prek`               | (config in `.pre-commit-config.yaml`)            |
| Spell checking         | cspell               | en (American English, config in `.cspell.json`)  |
| Dependency updates     | Renovate             | (config in `renovate.json5`)                     |
| CI                     | GitHub Actions       | `.github/workflows/ci.yml`                       |
| Security scanning      | CodeQL               | `.github/workflows/codeql.yml`                   |

______________________________________________________________________

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
│       ├── base.html         # Base Jinja2 layout (header, footer, Google Fonts CDN)
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
- **`theme/templates/base.html`**: Custom Tailwind navbar, skip-to-content link, semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`), ARIA labels, and responsive mobile menu. Links the locally-compiled `css/tailwind.css` and self-hosted `fontawesome/css/all.min.css`.
- **`theme/templates/home.html`**: Data-driven homepage with custom Tailwind components. Dark/light alternating sections, gradient accents, and accessibility-compliant markup with proper heading hierarchy and ARIA attributes.

______________________________________________________________________

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

______________________________________________________________________

## Code Style Guidelines

- **Configuration language**: Python files (`pelicanconf.py`, `publishconf.py`) use standard Python conventions.
- **Template language**: Jinja2 HTML templates use 4-space indentation.
- **Data structures in config**: `BELIEFS`, `VALUES`, and `TEAM_MEMBERS` are plain Python lists and dicts defined in `pelicanconf.py`. They are injected into all templates.
- **Images**: Content images (member photos, hero images) live in `content/images/`. Theme assets (logo, placeholder) live in `theme/static/images/`.

______________________________________________________________________

## Testing Instructions

**There are no tests in this project.**

No test runner configuration, no test files, and no testing dependencies exist.

If you add tests, the project uses Python >= 3.14 and `uv`. A reasonable choice would be `pytest`.

______________________________________________________________________

## Development Workflow

- **CSS build**: `make css` downloads the pinned, checksum-verified [Tailwind standalone CLI](https://github.com/tailwindlabs/tailwindcss/releases) into `.bin/` (via `scripts/install-tailwindcss.sh`) and compiles `theme/tailwind.input.css` to `theme/static/css/tailwind.css`. `build`/`serve`/`publish` depend on it. Neither the CLI binary nor the compiled CSS is committed.
- **Linting/formatting**: [Ruff](https://docs.astral.sh/ruff/), configured in `pyproject.toml`. Run via `make lint` / `make format`, or `uv run ruff check .` / `uv run ruff format .`.
- **Pre-commit hooks**: `.pre-commit-config.yaml` runs Ruff, mdformat, [cspell](https://cspell.org/) (American English), actionlint, and basic hygiene hooks (trailing whitespace, YAML/TOML/JSON validity, `uv lock` sync), executed via [`prek`](https://github.com/j178/prek) (a Rust reimplementation of `pre-commit`, compatible with the same config). Install once with `uv tool install prek && prek install`; run on demand with `make precommit`.
- **Spell checking**: cspell is configured in `.cspell.json` (`language: en`) with project-specific words (names, identifiers) in `.cspell/project-words.txt`. Runs on changed files and on the commit message.
- **CI**: `.github/workflows/ci.yml` runs Ruff lint/format checks and a Pelican production build on every push and pull request.
- **Security scanning**: `.github/workflows/codeql.yml` runs CodeQL (Python + GitHub Actions) on pushes, pull requests, and a weekly schedule.
- **Dependency updates**: [Renovate](https://docs.renovatebot.com/) is configured in `renovate.json5` to open PRs for Python dependencies, GitHub Actions, and pre-commit hook revisions.

## Deployment

- **Platform**: GitHub Pages, serving the `gh-pages` branch, behind the `diversity.python.org` custom domain.
- **Mechanism**: `.github/workflows/deploy.yml` builds the Pelican site with `publishconf.py` and pushes `output/` to the `gh-pages` branch on every push to `main`.

### To deploy Pelican-generated output manually

You would typically:

1. Run `uv run pelican content -o output -s publishconf.py`
1. Copy the contents of `output/` to the branch or directory configured for GitHub Pages.

______________________________________________________________________

## Security Considerations

- The `.gitignore` file ignores macOS system files, the `output/` build directory, `.venv/`, Python caches, and Ruff/uv caches.
- No secrets, API keys, or credentials are present in the repository.
- GitHub Actions in `.github/workflows/` are pinned to full commit SHAs (with the version in a trailing comment); Renovate keeps them current.
- The project is licensed under Apache-2.0 (`LICENSE`).
- Several navigation and social links in the templates are set to `#` placeholders.
- Templates still load Google Fonts (Inter) from a CDN. Tailwind CSS and Font Awesome are compiled/vendored locally (`make css`, `theme/static/fontawesome/`), not loaded from a CDN.

______________________________________________________________________

## Known Issues & Observations

1. **Missing theme CSS**: `theme/templates/base.html` links to `css/style.css`, but `theme/static/css/` is empty. The Pelican build produces pages with broken styling unless CSS is added.
1. **Placeholder data**: `MEMBERS` in `pelicanconf.py` is loaded from `members/*.json`. Some members may still use empty `image` fields and fall back to `Portrait_Placeholder.png`.
1. **Placeholder URLs**: `publishconf.py` uses `example.com`; many footer/nav links are `#`.
1. **Duplicate homepage template**: Both `home.html` and `index.html` exist in `theme/templates/`. `home.html` is data-driven;
1. **`main.py`**: This file is a stub (`print("Hello from diversity-and-inclusion-wg!")`) and is not used by the site build.
