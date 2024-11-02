import fs from 'node:fs/promises';
import path from 'node:path';
import md5 from 'md5';
import postcss from 'postcss';

import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import postcssDarkThemeClass from 'postcss-dark-theme-class';
import cssnano from 'cssnano';

const POSTCSS_PRESET_ENV_CONFIG = {
  features: {
    'custom-properties': false,
    'custom-media-queries': true,
    'environment-variables': true,
    'media-query-ranges': true,
    'custom-selectors': true,
    'logical-properties-and-values': false,
    'color-functional-notation': true,
    'gap-properties': true,
    'overflow-property': false,
    'place-properties': false,
    'nesting-rules': true,
    'not-pseudo-class': false,
  },
};

export default class {
  async data() {
    const rawFilePath = path.join(
      import.meta.dirname,
      '../_src/css/default.css',
    );
    return {
      permalink: 'css/default.css',
      rawFilePath,
      rawCss: await fs.readFile(rawFilePath, 'utf8'),
    };
  }

  async render({rawCss, rawFilePath}) {
    return await postcss([
        postcssImport(),
        postcssPresetEnv(POSTCSS_PRESET_ENV_CONFIG),
        postcssDarkThemeClass({
          darkSelector: '.g-night',
          lightSelector: '.g-day',
        }),
        cssnano({
          preset: 'default',
        }),
      ])
      .process(rawCss, {from: rawFilePath})
      .then(async ({css}) => {
        const versionFilePath = path.join(import.meta.dirname, '../_tmp');
        try {
          await fs.access(versionFilePath);
        } catch {
          await fs.mkdir(versionFilePath);
        }
        await fs.writeFile(`${versionFilePath}/cssVersion`, md5(css), 'utf8');
        return css;
      });
  }
};

