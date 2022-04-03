const fs = require('fs-extra');
const inlineSvg = require('rollup-plugin-inline-svg');
const md5 = require('md5');
const path = require('path');
const rollup = require('rollup');
const {terser} = require('rollup-plugin-terser');
const {nodeResolve: resolve} = require('@rollup/plugin-node-resolve');
const {babel} = require('@rollup/plugin-babel');

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

module.exports = class {
  async data() {
    const rawFilePath = path.join(__dirname, `../_src/js/main.js`);

    return {
      permalink: `js/main.js`,
      rawCode: fs.readFileSync(rawFilePath, 'utf8'),
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

    const bundle = await rollup.rollup(inputOpts);
    const generated = await bundle.generate(outputOpts);
    const js = generated.output[0].code;

    fs.outputFileSync(path.join(__dirname, `../_tmp/jsVersion`),
        md5(js), 'utf8');

    return js;
  }
};
