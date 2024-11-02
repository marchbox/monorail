import posthtml from 'posthtml';
import urls from 'posthtml-urls'
import absoluteUrl from './absolute-url.mjs';

async function convert(htmlContent, base, processOptions = {}) {
  if(!base) {
    throw new Error('htmlToAbsoluteUrls(absolutePostUrl) was missing the ' +
        'full URL base `absolutePostUrl` argument.')
  }

  const options = {
    eachURL(url) {
      return absoluteUrl(url.trim(), base);
    },
  };
  const modifier = posthtml().use(urls(options));
  const result = await modifier.process(htmlContent, processOptions);

  return result.html;
}

export default function(htmlContent, base, callback) {
  if(!htmlContent) {
    callback(null, '');
    return;
  }

  const posthtmlOptions = Object.assign({
    // default PostHTML render options
    closingSingleTag: 'slash',
  });

  convert(htmlContent, base, posthtmlOptions).then(html => {
    callback(null, html);
  });
}
