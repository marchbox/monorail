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

    const res = await fetch(src, {
      'Accept': 'image/svg+xml',
    });

    if (res.ok) {
      const svg = await res.text();
      const template = document.createElement('template');
      template.innerHTML = svg;

      const element = template.content.cloneNode(true);
      const svgEl = element.querySelector('svg');
      if (width) {
        svgEl.setAttribute('width', width);
      }
      if (height) {
        svgEl.setAttribute('height', height);
      }
      this.append(svgEl);
    }
  }
}
