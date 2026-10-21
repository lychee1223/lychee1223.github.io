# [lychee1223.github.io](https://lychee1223.github.io/)

[![Build, check, and deploy](https://github.com/lychee1223/lychee1223.github.io/actions/workflows/nextjs.yml/badge.svg?branch=main)](https://github.com/lychee1223/lychee1223.github.io/actions/workflows/nextjs.yml)

Takuro Kawada's personal academic website published on GitHub Pages.

## Run locally

Use the Node.js 24 LTS version specified in [.nvmrc](.nvmrc). With [nvm](https://github.com/nvm-sh/nvm) installed:

```bash
nvm install
nvm use
npm ci
npm run dev
```

Open <http://localhost:3000>. Restart the development server after updating dependencies.

## Check and build

```bash
npm run check
npm run build
npm run links:check
```

The link commands require [lychee](https://lychee.cli.rs/). CI installs version 0.24.2; use the same version locally for matching results. Run them after building so they can inspect the generated `out/` directory.

| Command                  | Purpose                                                                 |
| ------------------------ | ----------------------------------------------------------------------- |
| `npm run check`          | Run lint, formatting checks, type checks, and tests                     |
| `npm run lint`           | Check ESLint rules                                                      |
| `npm run lint:fix`       | Apply automatic ESLint fixes                                            |
| `npm run format:check`   | Check formatting without changing files                                 |
| `npm run format`         | Format the repository with Prettier                                     |
| `npm run typecheck`      | Generate Next.js route types and run TypeScript                         |
| `npm run test:links`     | Run link-checker integration tests (requires lychee)                    |
| `npm test`               | Run the Node.js regression tests                                        |
| `npm run build`          | Export the site to `out/`                                               |
| `npm run links:check`    | Check internal links, assets, and HTML anchors, plus local README links |
| `npm run links:external` | Check external HTTP(S) links in the export and README                   |
| `npm audit --omit=dev`   | Audit production dependencies                                           |

Both development and production builds explicitly use Webpack because the metadata loaders use `require.context`. The published site consists of static files; GitHub Pages does not run a Node.js or PHP application server.

## Continuous integration and deployment

[The workflow](.github/workflows/nextjs.yml) runs on pull requests to `main`, pushes to `main`, and manual dispatches.

Before publishing, it checks lint, formatting, TypeScript, tests, production dependencies, the static build, and internal links. Failures in any of these checks stop deployment. Pull requests run the checks without deploying.

External links are checked separately within the same build job. Failures produce a warning and a report, while deployment continues: a remote site may be temporarily unavailable, rate-limit requests, or block automated access. HTTP 403 and 429 responses are reported as failures rather than silently accepted.

Link-check results appear in the workflow's job summary and the `link-check-reports` artifact, retained for seven days. Configuration lives in [.lychee/internal.toml](.lychee/internal.toml) and [.lychee/external.toml](.lychee/external.toml). Links to this site's own domain are checked against the new export, so unpublished pages are validated before they go live.

Only successful checks on `main` can publish to GitHub Pages. The repository's Pages source must be set to **GitHub Actions**. If checks must also be required before merging, select the **Build and check** status in the repository's branch protection or ruleset settings.

## Project structure

```text
src/
  app/                    Routes, layout, and global styles
  components/             Home sections, navigation, and publication rendering
  data/
    aboutme.ts            Profile and contact details
    authors.ts            Author names and profile URLs
    experiences/          One TypeScript file per experience
    publications/
      <category>/<slug>/
        metadata.ts       Publication metadata
        content.md        Optional detail-page content
    news.ts               News entries
    awards-grants.ts      Awards and grants
    section-order.ts      Home section order
  lib/                    Publication formatting, sorting, and filtering
  utils/                  Date and metadata-loading helpers
public/
  portrait.png
  publications/<slug>/    Papers, slides, posters, and other static assets
scripts/                  News-entry and link-check commands
tests/                    Node.js regression tests
```

## Update content

### Profile and home sections

Edit [src/data/aboutme.ts](src/data/aboutme.ts) for the biography, affiliations, contact details, interests, and profile image. The `AboutMe` interface in that file lists the supported fields.

Edit [src/data/section-order.ts](src/data/section-order.ts) to reorder the home sections. Section headings and descriptions live in the corresponding components under `src/components/home/sections/`.

### Publications, talks, and articles

1. Add `src/data/publications/<category>/<slug>/metadata.ts` with a named or default export matching the `Publication` type.
2. Optionally add `content.md` beside it for the detail page.
3. Place local files under `public/publications/<slug>/` and link to them as `/publications/<slug>/...`.

```typescript
import type { Publication } from "@/data/publication";

export const example: Publication = {
  slug: "my-publication",
  title: "Publication title",
  authors: [{ name: "Takuro Kawada" }],
  date: "2026-10-22",
  category: "domestic-conference",
  venueShort: "Conference 2026",
  relatedLinks: {
    Slides: "/publications/my-publication/slides.pdf",
  },
};
```

Supported categories are `international-conference`, `domestic-conference`, `preprint`, `article`, and `talk`. See [src/lib/publications.ts](src/lib/publications.ts) for the full schema, including equal-contribution authors, abstracts, awards, keywords, and related links.

A standalone Markdown link to a PDF in `content.md` renders as an embedded viewer:

```markdown
[Presentation slides](/publications/my-publication/slides.pdf)
```

The viewer loads as it approaches the viewport. Ordinary inline links remain links.

### Experience

Add a TypeScript file under `src/data/experiences/` exporting an `ExperienceItem` as defined in [src/data/experience.ts](src/data/experience.ts).

```typescript
import type { ExperienceItem } from "@/data/experience";

export const example: ExperienceItem = {
  slug: "example-position",
  start: "2026-04",
  organization: "Example University",
  titles: ["Research Assistant"],
};
```

Use `YYYY` or `YYYY-MM` dates. Omit `end` for an ongoing position. Optional metadata can be plain text or a `{ label, href }` link.

### News

Edit [src/data/news.ts](src/data/news.ts), or use the CLI:

```bash
# Create a publication announcement from a venue name.
npm run news:add -- venue "MIPR 2026"

# Create an announcement from a talk's slug.
npm run news:add -- talk kawada2026ai4science

# Add a manual announcement: date, title, item title, and destination.
npm run news:add -- manual 2026-10-22 "Research update" "SciGA" "/publications/kawada2026sciga"
```

### Awards and grants

Edit [src/data/awards-grants.ts](src/data/awards-grants.ts). Each entry can include a date, title, description, received items, and related links. Keep certificates and other local assets under `public/`.

## Dependency maintenance

Use `npm audit` to inspect all dependencies. The `overrides` in [package.json](package.json) keep KaTeX and the CSS selector parser on patched versions.

As of October 22, 2026, the production dependency audit reports no known vulnerabilities. The full audit still reports seven development/build dependency warnings originating from an [unpatched denial-of-service issue in braces](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). These packages process repository file patterns during development and builds; they do not run on the published static site.

## Acknowledgements and license

Based on [research-website-template](https://github.com/tovacinni/research-website-template).

The code is available under the [MIT license](LICENSE). Replace the personal information and publication content before reusing this site.
