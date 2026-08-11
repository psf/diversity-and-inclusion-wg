# Agent Guide: diversity-and-inclusion-wg

> This file is intended for AI coding agents working on this project. The reader of this file is
> expected to know nothing about the project.

______________________________________________________________________

## Project Overview

This repository contains the website for the **Python Software Foundation's Diversity & Inclusion
Workgroup**.

The site is currently hosted on **GitHub Pages** at: `https://diversity.python.org`

It is built with [Pelican](https://getpelican.com/) (`pelicanconf.py` for development,
`publishconf.py` for production) from Markdown pages in `content/pages/` and Jinja2 templates in
`theme/templates/`. `.github/workflows/deploy.yml` builds and deploys it automatically on every push
to `main`.

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
│   └── pages/                # Markdown page sources (Pelican metadata fenced with ---)
├── members/                  # One JSON file per member (see "Adding or Updating Members" in README.md)
├── theme/
│   ├── static/
│   │   ├── css/style.css     # Hand-written accessibility overrides (committed)
│   │   ├── css/tailwind.css  # Compiled by `make css`; not committed
│   │   └── fontawesome/      # Self-hosted Font Awesome Free
│   ├── tailwind.input.css    # Tailwind source (see "Development Workflow" below)
│   └── templates/
│       ├── base.html         # Base Jinja2 layout (header, footer, Google Fonts CDN)
│       ├── home.html         # Homepage template (uses BELIEFS, VALUES, LEADERSHIP_MEMBERS)
│       ├── index.html        # Unused: an older hardcoded homepage, not extended by anything
│       └── page.html         # Generic page template
├── pelicanconf.py            # Pelican development configuration
├── publishconf.py            # Pelican production configuration
├── pyproject.toml            # Python project metadata and dependencies
├── uv.lock                   # uv lockfile for reproducible installs
└── README.md                 # Human-readable project description
```

### Key Files Explained

- **`pelicanconf.py`**: Defines site metadata (`SITENAME`, `AUTHOR`, `THEME = "theme"`), content
  paths (`PAGE_PATHS = ["pages"]`), and large data structures (`BELIEFS`, `VALUES`, `MEMBERS`, and
  others) that feed the Jinja2 templates. Feeds are disabled for development.
- **`publishconf.py`**: Imports everything from `pelicanconf.py`, sets the production `SITEURL`
  (`https://diversity.python.org`), enables Atom feeds, and sets `DELETE_OUTPUT_DIRECTORY = True`.
- **`content/pages/index.md`**: Renders as the homepage. Uses Pelican metadata (`Title`, `Slug`,
  `URL`, `Save_as`, `Template: home`); the other files in `content/pages/` are the site's other
  pages (charter, initiatives, members).
- **`theme/templates/base.html`**: Custom Tailwind navbar, skip-to-content link, semantic landmarks
  (`<header>`, `<nav>`, `<main>`, `<footer>`), ARIA labels, and responsive mobile menu. Links the
  locally-compiled `css/tailwind.css` and self-hosted `fontawesome/css/all.min.css`.
- **`theme/templates/home.html`**: Data-driven homepage with custom Tailwind components. Dark/light
  alternating sections, gradient accents, and accessibility-compliant markup with proper heading
  hierarchy and ARIA attributes.

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

### Running the Pelican Site

`pelican content` alone skips the Tailwind CSS build (see "CSS build" under Development Workflow
below), so pages render unstyled unless `make css` has already been run. Prefer the `make` targets:

```bash
make build   # make css, then generate the site into output/
make serve   # make css, then serve with auto-reload at http://localhost:8000
```

______________________________________________________________________

## Code Style Guidelines

- **Configuration language**: Python files (`pelicanconf.py`, `publishconf.py`) use standard Python
  conventions.
- **Template language**: Jinja2 HTML templates use 4-space indentation.
- **Data structures in config**: `BELIEFS`, `VALUES`, `MEMBERS`, and others are plain Python lists
  and dicts defined in `pelicanconf.py`. They are injected into all templates.
- **Images**: Content images (member photos, hero images) live in `content/images/`. Theme assets
  (logo, placeholder) live in `theme/static/images/`.

______________________________________________________________________

## Writing Style

Default to American English spelling (`cspell` is configured for `en`), but clarity matters more
than dialect, similar to the
[CPython Developer's Guide style guide](https://devguide.python.org/documentation/style-guide/).
Many readers of this site are not native English speakers.

- Write short, direct sentences. Avoid compound or deeply nested clauses.
- Avoid idioms, sports metaphors, and other culturally specific references that don't translate.
- Spell out acronyms on first use (for example, "Python Software Foundation (PSF)").

______________________________________________________________________

## Testing Instructions

**There are no tests in this project.**

No test runner configuration, no test files, and no testing dependencies exist.

If you add tests, the project uses Python >= 3.14 and `uv`. A reasonable choice would be `pytest`.

______________________________________________________________________

## Development Workflow

- **CSS build**: `make css` downloads the pinned, checksum-verified
  [Tailwind standalone CLI](https://github.com/tailwindlabs/tailwindcss/releases) into `.bin/` (via
  `scripts/install-tailwindcss.sh`) and compiles `theme/tailwind.input.css` to
  `theme/static/css/tailwind.css`. `build`/`serve`/`publish` depend on it. Neither the CLI binary
  nor the compiled CSS is committed.
- **Linting/formatting**: [Ruff](https://docs.astral.sh/ruff/), configured in `pyproject.toml`. Run
  via `make lint` / `make format`, or `uv run ruff check .` / `uv run ruff format .`.
- **Pre-commit hooks**: `.pre-commit-config.yaml` runs Ruff, mdformat, [cspell](https://cspell.org/)
  (American English), actionlint, and basic hygiene hooks (trailing whitespace, YAML/TOML/JSON
  validity, `uv lock` sync), executed via [`prek`](https://github.com/j178/prek) (a Rust
  reimplementation of `pre-commit`, compatible with the same config). Install once with
  `uv tool install prek && prek install`; run on demand with `make precommit`.
- **Spell checking**: cspell is configured in `.cspell.json` (`language: en`) with project-specific
  words (names, identifiers) in `.cspell/project-words.txt`. Runs on changed files and on the commit
  message.
- **CI**: `.github/workflows/ci.yml` runs every hook in `.pre-commit-config.yaml` (not just Ruff —
  this is what catches issues in PRs from contributors who haven't run `prek install`) and a Pelican
  production build, on every push and pull request.
- **Security scanning**: `.github/workflows/codeql.yml` runs CodeQL (Python + GitHub Actions) on
  pushes, pull requests, and a weekly schedule.
- **Dependency updates**: [Renovate](https://docs.renovatebot.com/) is configured in
  `renovate.json5` to open PRs for Python dependencies, GitHub Actions, and pre-commit hook
  revisions.

## Deployment

- **Platform**: GitHub Pages, serving the `gh-pages` branch, behind the `diversity.python.org`
  custom domain.
- **Mechanism**: `.github/workflows/deploy.yml` builds the Pelican site with `publishconf.py` and
  pushes `output/` to the `gh-pages` branch on every push to `main`.

### To deploy Pelican-generated output manually

You would typically:

1. Run `make publish` (builds the Tailwind CSS, then runs
   `pelican content -o output -s publishconf.py`).
2. Copy the contents of `output/` to the branch or directory configured for GitHub Pages.

______________________________________________________________________

## Security Considerations

- The `.gitignore` file ignores macOS system files, the `output/` build directory, `.venv/`, Python
  caches, and Ruff/uv caches.
- No secrets, API keys, or credentials are present in the repository.
- GitHub Actions in `.github/workflows/` are pinned to full commit SHAs (with the version in a
  trailing comment); Renovate keeps them current.
- The project is licensed under Apache-2.0 (`LICENSE`).
- Several navigation and social links in the templates are set to `#` placeholders.
- Templates still load Google Fonts (Inter) from a CDN. Tailwind CSS and Font Awesome are
  compiled/vendored locally (`make css`, `theme/static/fontawesome/`), not loaded from a CDN.

______________________________________________________________________

## Known Issues & Observations

1. **Placeholder member photos**: some `members/*.json` files have an empty `image` field and fall
   back to `Portrait_Placeholder.png`.
2. **Placeholder links**: several footer/nav links in the templates are still `#`.
3. **Unused template**: `theme/templates/index.html` is an older hardcoded homepage. Nothing extends
   or references it; `home.html` is the one actually rendered for `content/pages/index.md`. It could
   be deleted, but that is a content decision, not something fixed here.
4. **Leadership data lives in two places**: `pelicanconf.py`'s `LEADERSHIP` dict (chair, co-chair,
   staff contact) is hand-maintained separately from each member's `role` field in `members/*.json`.
   Updating one without the other will make them drift out of sync.
