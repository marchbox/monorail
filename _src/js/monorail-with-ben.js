import {ClassName} from './monorail';
import {
  pxToRem,
  whenDocumentComplete,
  whenElementTransitionEnd,
} from './utils';

export default class extends HTMLElement {
  connectedCallback() {
    this.trainEl = this.querySelector(`.${ClassName.TRAIN}`);
    this.style.setProperty('--monorail-train-length',
        `${pxToRem(this.trainEl.scrollWidth)}rem`);
    // Arrive the monorail
    this.classList?.add?.(ClassName.ACTION);
  }
}
