const fs = require('fs');
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

module.exports = class {
  async data() {
    const rawFilePath = path.join(__dirname, `../_includes/js/main.js`);
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
      ],
    };
    const outputOpts = {
      format: 'iife',
      compact: true,
      plugins: [terser()],
    };

    const bundle = await rollup.rollup(inputOpts);
    const generated = await bundle.generate(outputOpts);

    return generated.output[0].code;
  }
};


