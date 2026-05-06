# Website overhaul: initiatives, members, templates & deployment

This PR restructures the Pelican site with dedicated pages for our initiatives, a data-driven members section, cleaner template architecture, and automated GitHub Pages deployment.

## What's new

### Pages
- **Global Community Mapping** — initiative page with challenge, approach, status, and CTAs
- **Community Organizer Kit** — resources page with getting-started guides, templates, and contribution flow
- **Community Surveys & Research** — findings from Asia-Pacific survey and grants analysis
- **Governance & Charter** — how we operate, charter link, and code of conduct
- **Current Members** — leadership and members by region with photo placeholders

### Members system
- Individual JSON files per member in `members/`
- Fields: name, role, region, active status, image, email, affiliation, socials, bio
- Leadership auto-derived from `role` field
- Past members shown automatically when `active: false`
- 15 current members + 10 past members added

### Template architecture
- Moved all HTML out of Markdown files
- Markdown files now contain only metadata (title, slug, template)
- Dedicated templates per page type:
  - `home.html`
  - `initiative-mapping.html`
  - `initiative-kit.html`
  - `initiative-research.html`
  - `charter.html`
  - `members.html`

### UI improvements
- Dynamic alternating section backgrounds (white / gray-50)
- Rectangular square member images with local placeholder fallback
- Header logo resized responsively (216×64 desktop, 140×42 mobile)
- Python favicon from python.org
- Initiatives section on homepage links to individual pages

### Deployment
- GitHub Actions workflow builds and pushes `output/` to `gh-pages` branch
- `publishconf.py` updated with correct GitHub Pages URL

## After merging
1. Go to **Settings → Pages**
2. Select **Deploy from a branch**
3. Choose `gh-pages` → `/ (root)`
4. Site will be live at `https://psf.github.io/diversity-and-inclusion-wg/`

## Notes for reviewers
- Member photos are currently placeholders (`theme/static/images/Portrait_Placeholder.png`)
- Members can add their own image URL or Gravatar in their JSON file
- Some CTA buttons still link to `#` pending future pages
