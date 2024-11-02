import fs from 'node:fs';
import path from 'node:path';

export default function(_content, outputPath) {
  const cssVersionPath = path.join(
    import.meta.dirname,
    '../../_tmp/cssVersion',
  );
  const cssVersion = fs.readFileSync(cssVersionPath).toString();

  const jsVersionPath = path.join(
    import.meta.dirname,
    '../../_tmp/jsVersion',
  );
  const jsVersion = fs.readFileSync(jsVersionPath).toString();

  if (outputPath?.endsWith('.html')) {
    return _content
        .replace('[css-version]', cssVersion)
        .replace('[js-version]', jsVersion);
  }

  return _content;
}

