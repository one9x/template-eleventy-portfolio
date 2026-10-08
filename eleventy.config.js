export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/style.css');
  eleventyConfig.addPassthroughCopy('src/favicon.svg');
  eleventyConfig.addPassthroughCopy('src/img');

  // Every project, newest first. One markdown file in src/projects/ is one
  // project; `featured: true` also puts it on the home page.
  eleventyConfig.addCollection('projects', (api) =>
    api.getFilteredByGlob('src/projects/*.md').sort((a, b) => b.data.year - a.data.year),
  );

  return {
    dir: { input: 'src', includes: '_includes', data: '_data', output: '_site' },
  };
}

// pathPrefix is left at '/'. On a One9x site you are at the root of your own
// subdomain; a pathPrefix left over from a GitHub Pages project repo produces a
// site whose every internal link is one level too deep.
