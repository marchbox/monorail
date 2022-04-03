const fs = require('fs');
const path = require('path');

const cssVersion = fs.readFileSync(
  path.join(__dirname, `../_tmp/cssVersion`)
).toString();
const jsVersion = fs.readFileSync(
  path.join(__dirname, `../_tmp/jsVersion`)
).toString();

module.exports = function(content, outputPath) {
  if (outputPath && outputPath.endsWith('.html')) {
    content = content
        .replace('[css-version]', cssVersion)
        .replace('[js-version]', jsVersion);
  }

  return content;
}

