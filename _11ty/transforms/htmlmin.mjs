import htmlmin from 'html-minifier-next';

export default function(content, outputPath) {
  if (outputPath?.endsWith('.html')) {
    return htmlmin.minify(content, {
      caseSensitive: true,
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: true,
      decodeEntities: true,
      preserveLineBreaks: true,
      minifyJS: true,
      minifyCSS: true,
    });
  }

  return content;
}
