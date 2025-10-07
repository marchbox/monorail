import image from './image.mjs';

export default async function(drawing) {
  if (!drawing.key) {
    return '';
  }
  const src = `/drawings/gallery/${drawing.key}.jpg`;
  const alt = drawing.alt || drawing.title || '';
  const widths = [600, 1240];
  const sizes = '(max-width: 300px) 300px, 620px';

  return await image(src, alt, widths, sizes);
}
