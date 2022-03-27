import {render} from './utils';

export default class extends HTMLElement {
  async connectedCallback() {
    const src = this.getAttribute('src');
    const width = this.getAttribute('width');
    const height = this.getAttribute('height');

    try {
      new URL(src, window.location.origin);
    } catch {
      throw new Error('land-inlinesvg requires a valid URL as the `src` ' +
          'attribute’s value, provided `src`: ' + src)
    }

    this.style.display = 'block';
    this.style.maxBlockSize = '100%';
    this.style.maxInineSize = '100%';
    if (height) {
      this.style.blockSize = `${height}px`;
    }
    if (width) {
      this.style.inlineSize = `${width}px`;
    }

    const res = await fetch(src, {
      'Accept': 'image/svg+xml',
    });

    if (res.ok) {
      const svg = await res.text();
      const template = document.createElement('template');
      template.innerHTML = svg;

      const svgEl = template.content.querySelector('svg');
      if (width) {
        svgEl.setAttribute('width', width);
      }
      if (height) {
        svgEl.setAttribute('height', height);
      }
      svgEl.style.display = 'block';

      render(this, template);
    }
  }
}
