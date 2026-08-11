# Security Policy

This repository is a static website (Pelican + GitHub Pages) for the Python Software Foundation's
Diversity & Inclusion Workgroup. There is no login, no user accounts, and no backend that processes
data at runtime, so the realistic attack surface is small: mainly the build and deploy pipeline
(GitHub Actions) and the content of the site itself.

This is a volunteer-maintained project with no dedicated security team or SLA. Reports are handled
on a best-effort basis.

## Reporting a Vulnerability

Please report security issues privately, not in a public issue or pull request.

Preferred: use GitHub's private vulnerability reporting for this repository (**Security** tab →
**Report a vulnerability**, or
<https://github.com/psf/diversity-and-inclusion-wg/security/advisories/new>).

If that is not available to you, email the workgroup at **diversity-inclusion-wg@python.org**.

## Scope

In scope:

- Anything that could compromise the GitHub Actions build/deploy pipeline (for example, an
  untrusted-input injection into a workflow, or a way to bypass the SHA-pinned action versions).
- Cross-site scripting or other injection via site templates or content.
- Leaked secrets (tokens, keys) in the repository or CI logs.

Out of scope:

- Typos, broken links, outdated content, or incorrect member information — please open a regular
  issue or pull request for these.
- Vulnerabilities in third-party dependencies (Pelican, Tailwind CSS, Font Awesome, etc.) that don't
  have a project-specific exploit path here. These are tracked via CodeQL and Renovate.
- Availability of GitHub Pages itself.
