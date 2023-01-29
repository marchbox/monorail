const fs = require('fs-extra');
const md5 = require('md5');
const path = require('path');
const postcss = require('postcss');

const FILE_NAME = 'default.css';

const POSTCSS_PRESET_ENV_CONFIG = {
  features: {
    'custom-properties': false,
    'custom-media-queries': true,
    'environment-variables': true,
    'media-query-ranges': true,
    'custom-selectors': true,
    'logical-properties-and-values': {
      preserve: true,
    },
    'color-functional-notation': true,
    'gap-properties': true,
    'overflow-property': true,
    'place-properties': true,
    'nesting-rules': true,
    'not-pseudo-class': true,
  },
};

module.exports = class {
  async data() {
    const rawFilePath = path.join(__dirname, `../_src/css/default.css`);
    return {
      permalink: `css/${FILE_NAME}`,
      rawFilePath,
      rawCss: fs.readFileSync(rawFilePath),
    };
  }

  async render({rawCss, rawFilePath}) {
    return await postcss([
        require('postcss-import'),
        require('postcss-preset-env')(POSTCSS_PRESET_ENV_CONFIG),
        require('postcss-dark-theme-class')({
          darkSelector: '.g-night',
          lightSelector: '.g-day',
        }),
        require('cssnano')({
          preset: 'default',
        }),
      ])
      .process(rawCss, {from: rawFilePath})
      .then(({css}) => {
        fs.outputFileSync(path.join(__dirname, `../_tmp/cssVersion`),
            md5(css), 'utf8');
        return css;
      });
  }
};

