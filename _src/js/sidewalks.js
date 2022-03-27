import {render} from './utils';

const styles = `
:host {
  display: block;
}

.container {
  align-items: end;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}

.sidewalk {
  align-items: end;
  display: grid;
  grid-template: auto / auto;
}

.sidewalk:first-child {
  justify-content: end;
}

.sidewalk:last-child {
  justify-content: start;
}

land-inlinesvg {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}
`;

const template = (src) => `
  <div class="container" part="container">
    <div class="sidewalk" part="sidewalk sidewalk-start">
      <land-inlinesvg src="${src}" width="74" height="90"></land-inlinesvg>
      <land-inlinesvg src="${src}" width="89" height="122" style="transform: translatex(-4rem)"></land-inlinesvg>
    </div>
    <div class="sidewalk" part="sidewalk sidewalk-end">
      <land-inlinesvg src="${src}" width="52" height="72"></land-inlinesvg>
      <land-inlinesvg src="${src}" width="44" height="61" style="transform: translatex(4.8rem)"></land-inlinesvg>
      <land-inlinesvg src="${src}" width="88" height="122" style="transform: translatex(5.9rem)"></land-inlinesvg>
    </div>
  </div>
`;

export default class Sidewalks extends HTMLElement {
  shadow;

  constructor() {
    super();

    this.shadow = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    this.setAttribute('aria-hidden', 'true');

    const src = this.getAttribute('src');

    render(this.shadow, template(src), styles);
  }
}
