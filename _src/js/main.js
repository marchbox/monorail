import 'regenerator-runtime/runtime';
import '@ungap/custom-elements-builtin';

import Logo from './logo';
import Monorail from './monorail';
import Sidewalks from './sidewalks';
import {
  whenDocumentComplete,
  whenDocumentReady,
} from './utils';

whenDocumentReady().then(() => {
  if ('customElements' in window) {
    customElements.define('land-logo', Logo);
    customElements.define('land-sidewalks', Sidewalks);
  }
});

whenDocumentComplete().then(() => {
  if ('customElements' in window) {
    customElements.define('land-monorail', Monorail, {extends: 'nav'});
  }
});
