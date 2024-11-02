import image from '@11ty/eleventy-img';

export default async function(src, alt, widths, sizes) {
  const urlPath = src.replace(src.split('/').pop(), '');

  const metadata = await image(`.${src}`, {
    widths,
    formats: ['avif', 'webp', 'jpg'],
    outputDir: `./_site${urlPath}`,
    urlPath,
    sharpJpegOptions: {
      progressive: true,
    },
  });

  const attrs = {
    alt,
    sizes,
    loading: 'lazy',
    decoding: 'async',
  };

  return image.generateHTML(metadata, attrs);
}
