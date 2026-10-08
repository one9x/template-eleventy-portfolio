// Everything about you that more than one page uses. Edit this first.
export default {
  name: 'Jane Doe',
  role: 'Designer & developer',
  description:
    'Jane Doe designs and builds calm, useful software — product design, front-end and the bits in between.',
  email: 'hello@example.com',

  // Shown in the footer. Add your own, e.g.
  //   { label: 'GitHub', url: 'https://github.com/<you>' },
  links: [{ label: 'Email', url: 'mailto:hello@example.com' }],

  // The address the site is served from. It is baked into canonical URLs,
  // Open Graph tags and the sitemap — the one value here that search engines
  // act on. CI sets SITE_URL to https://<ONE9X_SITE>.one9x.app, or to the repo
  // variable SITE_URL once you link a custom domain.
  url: (process.env.SITE_URL || 'https://example.one9x.app').replace(/\/+$/, ''),

  year: new Date().getFullYear(),
};
