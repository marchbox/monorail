const {DateTime} = require('luxon');
const fs = require('fs');
const htmlmin = require('html-minifier');
const path = require('path');
const pluginRss = require('@11ty/eleventy-plugin-rss');
// const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const pluginNavigation = require('@11ty/eleventy-navigation');
const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

const OUTPUT_DIR = '_site';

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  // eleventyConfig.addPlugin(pluginSyntaxHighlight);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addGlobalData('cssVersion', () => {
    const rawFilePath = path.join(__dirname, `../${OUTPUT_DIR}/css/default.css`);
    const {mtime} = fs.statSync(rawFilePath);
    return mtime.getTime();
  });

  eleventyConfig.addGlobalData('jsVersion', () => {
    const rawFilePath = path.join(__dirname, `../${OUTPUT_DIR}/js/main.js`);
    const {mtime} = fs.statSync(rawFilePath);
    return mtime.getTime();
  });

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addFilter('readableDate',
    date => DateTime.fromJSDate(date, {zone: 'utc'}).toFormat('LLLL dd, yyyy'));

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head',
    (array, n) => n < 0 ? array.slice(n) : array.slice(0, n));

  eleventyConfig.addFilter('getFontUrl', require('./get-font-url.js'));
  eleventyConfig.addFilter('articleList', require('./article-list.js'));
  eleventyConfig.addFilter('isParent', require('./is-parent.js'));

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('*.txt');
  eleventyConfig.addPassthroughCopy('(about|articles|drawings)/**/*.(jpg|png)');

  eleventyConfig.addTransform('htmlmin', function(content, outputPath) {
    if (outputPath && outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        decodeEntities: true,
        preserveLineBreaks: true,
        minifyJS: true,
        minifyCSS: true,
      });
      return minified;
    }

    return content;
  });

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
  });
  eleventyConfig.setLibrary('md', markdownLibrary);

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, browserSync) {
        const content_404 = fs.readFileSync(`${OUTPUT_DIR}/404.html`);

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false
  });

  return {
    dir: {
      includes: '_src',
      layouts: '_src/njk',
    },
    output: OUTPUT_DIR,
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
};
