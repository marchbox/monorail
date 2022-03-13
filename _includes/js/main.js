import 'regenerator-runtime/runtime';
import * as Turbo from '@hotwired/turbo';
import iterator from '@ungap/custom-elements-builtin';

import {Monorail} from './monorail.js';
import {whenDocumentReady} from './utils.js';

if ('customElements' in window) {
  customElements.define('land-monorail', Monorail, {extends: 'nav'});
}

document.documentElement.addEventListener('turbo:load', () => {
  // Remove and use CSS once `text-underline-offset` is supported in Chromium.
  [...document.querySelectorAll('h1,h2,h3')].forEach(h => {
    const shadow = h.attachShadow({mode: 'open'});
    shadow.innerHTML = '<span part="text" role="presentation"><slot></slot></span>';
  });
});
