import {
  pxToRem,
  render,
} from './utils';

import treeSvg from '../svg/tree.svg';

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

.tree {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}
`;

const template = `
  <div class="container" part="container">
    <div class="sidewalk" part="sidewalk sidewalk-start">
      <div class="tree" style="width:${pxToRem(74)}rem;height:${pxToRem(90)}rem">${treeSvg}</div>
      <div class="tree" style="width:${pxToRem(89)}rem;height:${pxToRem(122)}rem;transform: translatex(-4rem)">${treeSvg}</div>
    </div>
    <div class="sidewalk" part="sidewalk sidewalk-end">
      <div class="tree" style="width:${pxToRem(52)}rem;height:${pxToRem(72)}rem">${treeSvg}</div>
      <div class="tree" style="width:${pxToRem(44)}rem;height:${pxToRem(61)}rem;transform: translatex(4.8rem)">${treeSvg}</div>
      <div class="tree" style="width:${pxToRem(88)}rem;height:${pxToRem(122)}rem;transform: translatex(5.9rem)">${treeSvg}</div>
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
    render(this.shadow, template, styles);
  }
}
