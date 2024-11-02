import fs from 'node:fs';
import markdownIt from 'markdown-it';
import markdownItAbbr from 'markdown-it-abbr';
import markdownItAttrs from 'markdown-it-attrs';
import markdownItDeflist from 'markdown-it-deflist';
import pluginNavigation from '@11ty/eleventy-navigation';
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import yaml from 'js-yaml';

import currentYear from './shortcodes/current-year.mjs';
import copyrightYear from './shortcodes/copyright-year.mjs';
import image from './shortcodes/image.mjs';
import drawingImage from './shortcodes/drawing-image.mjs';
import postTagList from './filters/post-tag-list.mjs';
import postTagName from './filters/post-tag-name.mjs';
import classes from './filters/classes.mjs';
import getFontUrl from './filters/get-font-url.mjs';
import isParent from './filters/is-parent.mjs';
import readableDate from './filters/readable-date.mjs';
import readableYearMonth from './filters/readable-year-month.mjs';
import attrDate from './filters/attr-date.mjs';
import imgUrl from './filters/img-url.mjs';
import listHead from './filters/list-head.mjs';
import listTail from './filters/list-tail.mjs';
import listIncludes from './filters/list-includes.mjs';
import absoluteUrl from './filters/absolute-url.mjs';
import latestCollectionItemDate from './filters/latest-collection-item-date.mjs';
import dateToRfc3339 from './filters/date-to-rfc3339.mjs';
import htmlToAbsoluteUrls from './filters/html-to-absolute-urls.mjs';
import htmlmin from './transforms/htmlmin.mjs';
import addCacheVersions from './transforms/add-cache-versions.mjs';
import articlesTags from './collections/articles-tags.mjs';
import articlesArchives from './collections/articles-archives.mjs';

const OUTPUT_DIR = '_site';

export default async function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(syntaxHighlight);

  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
  });
  markdownLibrary.use(markdownItAbbr);
  markdownLibrary.use(markdownItAttrs, {
    leftDelimiter: '{@',
  });
  markdownLibrary.use(markdownItDeflist);
  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.addDataExtension('yaml', contents => yaml.load(contents));
  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addShortcode('currentYear', currentYear);
  eleventyConfig.addShortcode('copyrightYear', copyrightYear);
  eleventyConfig.addShortcode('image', image);
  eleventyConfig.addShortcode('drawingImage', drawingImage);

  eleventyConfig.addFilter('postTagList', postTagList);
  eleventyConfig.addFilter('postTagName', postTagName);
  eleventyConfig.addFilter('classes', classes);
  eleventyConfig.addFilter('getFontUrl', getFontUrl);
  eleventyConfig.addFilter('isParent', isParent);
  eleventyConfig.addFilter('readableDate', readableDate);
  eleventyConfig.addFilter('readableYearMonth', readableYearMonth);
  eleventyConfig.addFilter('attrDate', attrDate);
  eleventyConfig.addFilter('imgUrl', imgUrl);
  eleventyConfig.addFilter('listHead', listHead);
  eleventyConfig.addFilter('listTail', listTail);
  eleventyConfig.addFilter('listIncludes', listIncludes);
  eleventyConfig.addFilter('md', content => markdownLibrary.render(content));

  // Filters from @11ty/eleventy-plugin-rss with modifications.
  eleventyConfig.addFilter('absoluteUrl', absoluteUrl);
  eleventyConfig.addFilter('latestCollectionItemDate', latestCollectionItemDate);
  eleventyConfig.addFilter('dateToRfc3339', dateToRfc3339);
  eleventyConfig.addNunjucksAsyncFilter('htmlToAbsoluteUrls', htmlToAbsoluteUrls);

  eleventyConfig.addPassthroughCopy({
    '_static': '/',
  });
  eleventyConfig.addPassthroughCopy('*.txt');
  eleventyConfig.addPassthroughCopy('(about|articles|drawings)/**/*.(jpg|png)');

  eleventyConfig.addTransform('htmlmin', htmlmin);
  eleventyConfig.addTransform('addCacheVersions', addCacheVersions);

  eleventyConfig.addCollection('articlesTags', articlesTags);
  eleventyConfig.addCollection('articlesArchives', articlesArchives);

  eleventyConfig.addWatchTarget('./**/*.yaml');

  // Browsersync Overrides
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready(err, browserSync) {
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
