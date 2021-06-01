const fs = require('fs');
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
  },
};

module.exports = class {
  async data() {
    const rawFilePath = path.join(__dirname, `../_includes/css/default.css`);
    return {
      permalink: `css/${FILE_NAME}`,
      rawFilePath,
      rawCss: await fs.readFileSync(rawFilePath),
    };
  }

  async render({rawCss, rawFilePath}) {
    return await postcss([
        require('postcss-import'),
        require('postcss-preset-env')(POSTCSS_PRESET_ENV_CONFIG),
        require('cssnano')({
          preset: 'default',
        }),
      ])
      .process(rawCss, {from: rawFilePath})
      .then(result => result.css);
  }
};

