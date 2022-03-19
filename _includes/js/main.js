import 'regenerator-runtime/runtime';
import '@ungap/custom-elements-builtin';
import * as Turbo from '@hotwired/turbo';

import {Monorail} from './monorail.js';

if ('customElements' in window) {
  customElements.define('land-monorail', Monorail, {extends: 'nav'});
}

// Don’t navigate if the destination is the current page.
document.documentElement.addEventListener('turbo:before-visit', evt => {
  if (evt.detail.url === window.location.href) {
    evt.preventDefault();
  }
});

document.documentElement.addEventListener('turbo:load', () => {
  // Remove and use CSS once `text-underline-offset` is supported in Chromium.
  [...document.querySelectorAll(':is(h1,h2,h3):not(.plain)')].forEach(h => {
    const shadow = h.attachShadow({mode: 'open'});
    shadow.innerHTML = '<span part="text" role="presentation"><slot></slot></span>';
  });
});
