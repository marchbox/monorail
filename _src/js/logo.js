import {render} from './utils';

import logoSvg from '../svg/logo.svg';

const styles = `
:host,
.container {
  block-size: 100%;
  display: flex;
  inline-size: 100%;
}

svg {
  display: block;
  max-block-size: 100%;
  max-inline-size: 100%;
}
`;

const template = `
  <div class="container" aria-hidden="true">
    ${logoSvg}
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

    render(this.shadow, template, styles);
  }
}
