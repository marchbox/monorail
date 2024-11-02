import fs from 'node:fs/promises';
import path from 'node:path';
import inlineSvg from 'rollup-plugin-inline-svg';
import md5 from 'md5';
import {rollup} from 'rollup';
import terser from '@rollup/plugin-terser';
import {nodeResolve as resolve} from '@rollup/plugin-node-resolve';
import {babel} from '@rollup/plugin-babel';

const BABEL_CONFIG = {
  presets: [
    ['@babel/preset-env', {modules: false}],
  ],
  plugins: [
    // Disabled these as they don't play well with @ungap/custom-elements-builtin.
    // ['@babel/plugin-proposal-class-properties', {loose: true}],
    // ['@babel/plugin-proposal-private-methods', {loose: true}],
  ],
  babelHelpers: 'bundled',
};

const INLINESVG_CONFIG = {
  removeSVGTagAttrs: false,
};

export default class {
  async data() {
    const rawFilePath = path.join(
      import.meta.dirname,
      '../_src/js/main.js',
    );

    return {
      permalink: 'js/main.js',
      rawCode: await fs.readFile(rawFilePath, 'utf8'),
      rawFilePath,
    };
  }

  async render({rawCode, rawFilePath}) {
    const inputOpts = {
      input: rawFilePath,
      plugins: [
        resolve(),
        babel(BABEL_CONFIG),
        inlineSvg(INLINESVG_CONFIG),
      ],
    };

    const outputOpts = {
      format: 'iife',
      compact: true,
      plugins: [terser()],
    };

    const bundle = await rollup(inputOpts);
    const generated = await bundle.generate(outputOpts);
    const js = generated.output[0].code;

    const versionFilePath = path.join(
      import.meta.dirname,
      '../_tmp/jsVersion',
    );
    await fs.writeFile(versionFilePath, md5(js), 'utf8');

    return js;
  }
};
