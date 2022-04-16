const image = require('./image.js');

module.exports = async function(drawing) {
  if (!drawing.key) {
    return '';
  }
  const src = `/drawings/gallery/${drawing.key}.jpg`;
  const alt = drawing.title || '';
  const widths = [600, 1240];
  const sizes = '(max-width: 300px) 300px, 620px';

  return image(src, alt, widths, sizes);
};
