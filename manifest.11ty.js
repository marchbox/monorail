module.exports = class {
  data() {
    return {
      permalink: '/manifest.json',
    };
  }

  render({metadata}) {
    return JSON.stringify({
      '$schema': 'https://json.schemastore.org/web-manifest-combined.json',
      name: metadata.title,
      description: metadata.description,
      start_url: '.',
      display: 'minimal-ui',
      icons: [{
        src: './favicon.svg',
        sizes: '512x512',
        type: 'image/svg+xml',
      }],
    }, null, '  ');
  }
};
