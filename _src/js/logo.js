import {render} from './utils';

const styles = `
:host {
  display: flex;
}

svg {
  display: block;
  max-block-size: 100%;
}
`;

const template = (src, width, height) => `
  <div class="container" aria-hidden="true">
    <land-inlinesvg src="${src}" width="${width}" height="${height}"></land-inlinesvg>
  </div>
`;

export default class extends HTMLElement {
  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    if (this.getAttribute('aria-label') !== '') {
      this.setAttribute('role', 'img');
    } else {
      this.setAttribute('aria-hidden', 'true');
    }

    const src = this.getAttribute('src');
    const width = parseFloat(this.getAttribute('width'));
    const height = parseFloat(this.getAttribute('height'));

    render(this.shadow, template(src, width, height), styles);
  }
}
