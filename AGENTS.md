# Agent instructions

This repository is an **Eleventy** portfolio template for
[One9x Pages](https://one9x.com), a static host. Everything below is specific to
this repo; the general platform docs are at <https://one9x.com/docs> and as
markdown at <https://one9x.com/llms.txt>.

## The one thing to know

| | |
| --- | --- |
| Build | `npm run build` |
| Output folder | `_site` |
| Needs `--spa` | no — never pass it |
| Live demo | <https://eleventy-portfolio.one9x.app/> |

## Where things are

| To change | Edit |
| --- | --- |
| Name, role, description, email, footer links | `src/_data/site.js` |
| Projects | `src/projects/*.md` — one file each; front matter `title`, `summary`, `year`, `role`, `tags`, `cover`, `coverAlt`, `featured` |
| Experience list | `src/_data/experience.json` |
| About text | `src/about.njk` |
| Colours, type, layout | `src/style.css` — `--accent` at the top drives the palette |
| Head, header, footer | `src/_includes/base.njk` |

The `projects` collection is defined in `eleventy.config.js` (every file in
`src/projects/`, newest `year` first). `featured: true` also puts a project on
the home page.

## Deploying

**Prefer the MCP server over the shell.** The One9x CLI is itself an MCP server —
`one9x mcp` speaks MCP over stdin/stdout — so a deploy is one tool call with no
shell glue. Register it once:

```sh
claude mcp add one9x -- one9x mcp
```

Then use the `release` tool with `dir: _site`, `site: <the site>`.

Without MCP, the same thing in the shell:

```sh
SITE_URL=https://<the site>.one9x.app npm run build
one9x pages release ./_site --site <the site> --error 404:/404.html --deploy
```

Leave `--deploy` off to stage instead: the release uploads and gets its own
preview URL at `v<n>--<site>.one9x.app`, and production keeps serving what it
serves now. `one9x pages deploy --site <site> --to v<n>` publishes it later, and
the same command with an earlier `v<n>` is how a rollback works.

**CI does this already.** `.github/workflows/deploy.yml` deploys on every push
once two settings exist (Settings → Secrets and variables → Actions): the
variable `ONE9X_SITE` and the secret `ONE9X_TOKEN`. Until `ONE9X_SITE` is set the
job is skipped, not failed. Prefer letting CI deploy over deploying by hand.

## The contact form

`src/contact.njk` posts to `/_one9x/forms/contact`, the form service built into
every One9x Pages site. It works only once the form is defined in the dashboard
(the site's **Forms** settings → turn on **Accept form submissions** → **New form** named
`contact` with fields `name` (Text, required), `email` (Email, required),
`message` (Long text, required), captcha on). An agent cannot do that step; tell
the user to. Submissions appear on the form's own page in the dashboard.

- The field names are the contract. A post with a field the dashboard form does
  not define is refused — never rename, add or remove an input without saying
  the same change has to be made in the dashboard.
- Keep the `_gotcha` input, the `<altcha-widget>` inside the form, and the
  `/_one9x/altcha.js` script exactly as they are. `_next` sends the visitor to
  `/contact/thanks/` and must stay a same-site path.
- Nothing under `/_one9x/` exists locally; a failed Send in `npm run dev` is
  expected. Do not "fix" it with a third-party form service.

## Rules for this repo

- `SITE_URL` is baked into canonical URLs, Open Graph tags, `sitemap.xml` and
  `robots.txt`. CI sets it to `https://<ONE9X_SITE>.one9x.app`, or to the repo
  variable `SITE_URL` if one exists — set that variable once a custom domain is
  linked. Unset, it is the placeholder `https://example.one9x.app`.
- Output is `_site`, set by `dir.output` in `eleventy.config.js`. Change it and change `dir:` in `.github/workflows/deploy.yml` to match.
- `pathPrefix` stays `/`. A leftover from a GitHub Pages project repo makes every internal link one level too deep.
- No external requests: no web fonts, CDNs or analytics scripts. Images go in `src/img/`.
- Never pass `--spa`.

## General

- The site name is a DNS label (lowercase letters, digits, hyphens) and becomes
  `<name>.one9x.app`. Create it before deploying: `one9x pages create <name>`. A
  release will not create one.
- Dot-paths are never uploaded — `.git`, `.env`, anything starting with a dot.
  `.well-known` is the one exception.
- `--exclude` globs are single-segment `path.Match`. `**` is not supported and
  matches nothing rather than erroring.
- Pages serves **paths, not routes**: `/about` is served `/about/index.html`. A
  build that wrote `about.html` instead 404s on every internal link while the
  homepage works.
- Re-deploying unchanged content is free and safe — the version id is a content
  hash, so an identical build produces an identical version and uploads nothing.
- Nothing here needs a server. If a change would require one, it is the wrong
  change for this repo.
