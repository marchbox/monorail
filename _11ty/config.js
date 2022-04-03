const fs = require('fs');
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

  eleventyConfig.setDataDeepMerge(true);

  // Get the first `n` elements of a collection.
  eleventyConfig.addFilter('head',
    (array, n) => n < 0 ? array.slice(n) : array.slice(0, n));

  eleventyConfig.addFilter('articleTagList', require('./filters/article-tag-list.js'));
  eleventyConfig.addFilter('articleTagName', require('./filters/article-tag-name.js'));
  eleventyConfig.addFilter('getFontUrl', require('./filters/get-font-url.js'));
  eleventyConfig.addFilter('isParent', require('./filters/is-parent.js'));
  eleventyConfig.addFilter('readableDate', require('./filters/readable-date.js'));
  eleventyConfig.addFilter('attrDate', require('./filters/attr-date.js'));

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('*.txt');
  eleventyConfig.addPassthroughCopy('(about|articles|drawings)/**/*.(jpg|png)');

  eleventyConfig.addTransform('htmlmin', require('./transforms/htmlmin.js'));
  eleventyConfig.addTransform('addCacheVersions', require('./transforms/add-cache-versions.js'));

  eleventyConfig.addCollection('articles', require('./collections/articles.js'));

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
