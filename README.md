# Portfolio template — Eleventy on One9x Pages

A personal portfolio you can make your own in an afternoon: a home page with
selected work, a page per project, an about page with your experience, and a
contact form that works without a backend. Built with
[Eleventy](https://www.11ty.dev/), wired to deploy to
[One9x Pages](https://one9x.com) on every push.

**Live demo: <https://eleventy-portfolio.one9x.app/>** — deployed by the
workflow in this repo.

**[Use this template](https://github.com/one9x/template-eleventy-portfolio/generate)**
to get your own copy.

## What's in it

| | |
| --- | --- |
| Home | intro and the projects marked `featured: true` |
| `/projects/` | every project, newest first |
| `/projects/<slug>/` | one page per markdown file in `src/projects/` |
| `/about/` | your story and an experience list from `src/_data/experience.json` |
| `/contact/` | a contact form posting to One9x Forms — no backend to run |
| Also | `404.html`, `sitemap.xml`, `robots.txt`, canonical and Open Graph tags, light and dark mode |

One dependency (`@11ty/eleventy`), plain CSS, no client-side JavaScript of its
own, and no requests to anyone else's servers — no web fonts, no analytics.

## Make it yours

1. **`src/_data/site.js`** — your name, role, one-line description, email and
   footer links.
2. **`src/projects/`** — one markdown file per project. Delete the four samples
   and copy one as a starting point:

   ```yaml
   ---
   title: Field notebook
   summary: One sentence; it shows on the card and as the page description.
   year: 2026
   role: Product design, front-end
   tags: [Product design, PWA]
   cover: /img/field-notebook.svg     # 16:10 works best; put files in src/img/
   coverAlt: What the cover image shows.
   featured: true                     # also show it on the home page
   ---
   ```

3. **`src/_data/experience.json`** and **`src/about.njk`** — your history and
   your words.
4. **`src/style.css`** — change `--accent` at the top and the whole site
   follows, dark mode included.
5. **Remove the demo bits**: the `<aside class="template-note">` at the bottom
   of `src/index.njk`, and — if you'd rather not say where the site is hosted —
   the "Deployed on One9x Pages" line in `src/_includes/base.njk`.

## Turn on the deploy workflow

`.github/workflows/deploy.yml` is already here. It needs two settings, both
under **Settings → Secrets and variables → Actions**:

| | Name | Value |
| --- | --- | --- |
| Variable | `ONE9X_SITE` | the site to deploy to |
| Secret | `ONE9X_TOKEN` | `one9x tokens create "github actions"` |

Create the site first:

```sh
one9x pages create mysite
```

Until `ONE9X_SITE` exists the job is **skipped**, not failed — a fresh copy of
this template should not open with a red X.

Once both are set: a pull request stages a release and comments the preview
URL, and a push to `main` publishes.

### Your address

The site's address is baked into canonical URLs, Open Graph tags and the
sitemap. CI uses `https://<ONE9X_SITE>.one9x.app` automatically. Once you link
a [custom domain](https://one9x.com/docs/domains), add one more repository
**variable**, `SITE_URL`, set to it (`https://janedoe.com`), and push.

## Turn on the contact form

`/contact/` posts to `/_one9x/forms/contact` — the form service built into every
One9x Pages site. It refuses every post until you define the form, once, in the
dashboard at [portal.one9x.com](https://portal.one9x.com):

1. Open your site's **Forms** settings.
2. Turn on **Accept form submissions**.
3. **New form**, named exactly `contact`, with three fields:

   | Field name | Type | Required |
   | --- | --- | --- |
   | `name` | Text | yes |
   | `email` | Email | yes |
   | `message` | Long text | yes |

4. Leave **Require a captcha** on.

That's all — the HTML is already in `src/contact.njk`. Submissions appear on the
`contact` form's own page in the dashboard, and a sender lands on `/contact/thanks/`.

The field names are the contract: rename or add an input in the HTML and define
the same field in the dashboard, or every post is refused. The form does nothing
locally — `/_one9x/` only exists on a deployed site. Details:
[Widgets](https://one9x.com/docs/widgets).

## Local development

```sh
npm install
npm run dev
```

## Output directory

`eleventy.config.js` sets `dir.output` to `_site`, which is also Eleventy's
default. Change it and change `dir:` in the workflow to match — the flag is just
a path.

## Docs

- [Eleventy on One9x Pages](https://one9x.com/docs/frameworks/eleventy) — the
  build command, the output folder, and the gotchas for this framework
- [Widgets](https://one9x.com/docs/widgets) — forms, captcha and limits
- [GitHub Actions](https://one9x.com/docs/github-actions)
- [More templates](https://one9x.com/templates)

## License

MIT
