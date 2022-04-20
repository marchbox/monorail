const fs = require('fs');
const markdownIt = require('markdown-it');
const markdownItAbbr = require('markdown-it-abbr');
const markdownItAttrs = require('markdown-it-attrs');
const markdownItDeflist = require('markdown-it-deflist');
const path = require('path');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const yaml = require('js-yaml');

const OUTPUT_DIR = '_site';

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);

  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addShortcode('currentYear', require('./shortcodes/current-year.js'));
  eleventyConfig.addNunjucksAsyncShortcode('image', require('./shortcodes/image.js'));
  eleventyConfig.addNunjucksAsyncShortcode('drawingImage', require('./shortcodes/drawing-image.js'));

  eleventyConfig.addFilter('postTagList', require('./filters/post-tag-list.js'));
  eleventyConfig.addFilter('postTagName', require('./filters/post-tag-name.js'));
  eleventyConfig.addFilter('classes', require('./filters/classes.js'));
  eleventyConfig.addFilter('getFontUrl', require('./filters/get-font-url.js'));
  eleventyConfig.addFilter('isParent', require('./filters/is-parent.js'));
  eleventyConfig.addFilter('readableDate', require('./filters/readable-date.js'));
  eleventyConfig.addFilter('readableYearMonth', require('./filters/readable-year-month.js'));
  eleventyConfig.addFilter('attrDate', require('./filters/attr-date.js'));
  eleventyConfig.addFilter('imgUrl', require('./filters/img-url.js'));
  eleventyConfig.addFilter('listHead', require('./filters/list-head.js'));
  eleventyConfig.addFilter('listIncludes', require('./filters/list-includes.js'));

  eleventyConfig.addPassthroughCopy('assets');
  eleventyConfig.addPassthroughCopy('*.txt');
  eleventyConfig.addPassthroughCopy('(about|articles|drawings)/**/*.(jpg|png)');

  eleventyConfig.addTransform('htmlmin', require('./transforms/htmlmin.js'));
  eleventyConfig.addTransform('addCacheVersions', require('./transforms/add-cache-versions.js'));

  eleventyConfig.addCollection('articlesTags', require('./collections/articles-tags.js'));
  eleventyConfig.addCollection('articlesArchives', require('./collections/articles-archives.js'));

  eleventyConfig.addWatchTarget('./**/*.yaml');

  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
  });
  markdownLibrary.use(markdownItAbbr);
  markdownLibrary.use(markdownItAttrs, {
    leftDelimiter: '{@',
  });
  markdownLibrary.use(markdownItDeflist);
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

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    excerpt_separator: '^^^',
  });

  return {
    dir: {
      includes: '_src',
      layouts: '_src/njk',
    },
    output: OUTPUT_DIR,
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
};
