import 'regenerator-runtime/runtime';
import '@ungap/custom-elements-builtin';

import Logo from './logo';
import Monorail from './monorail';
import Sidewalks from './sidewalks';
import {whenDocumentReady} from './utils';

if ('customElements' in window) {
  customElements.define('land-logo', Logo);
  customElements.define('land-monorail', Monorail, {extends: 'nav'});
  customElements.define('land-sidewalks', Sidewalks);
}

whenDocumentReady().then(() => {
  // Remove and use CSS once `text-underline-offset` is supported in Chromium.
  [...document.querySelectorAll(':is(h1,h2,h3):not(.plain)')].forEach(h => {
    const shadow = h.attachShadow({mode: 'open'});
    shadow.innerHTML = '<span part="text" role="presentation"><slot></slot></span>';
  });
});
