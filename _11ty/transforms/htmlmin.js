const htmlmin = require('html-minifier');

module.exports = function(content, outputPath) {
  if (outputPath && outputPath.endsWith('.html')) {
    let minified = htmlmin.minify(content, {
      caseSensitive: true,
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
}
