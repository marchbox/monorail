import 'regenerator-runtime/runtime';
import '@ungap/custom-elements-builtin';

import Glockenspiel from './glockenspiel';
import Monorail from './monorail';
import Sidewalks from './sidewalks';
import Tulgeywood from './tulgeywood';
import {
  whenDocumentComplete,
  whenDocumentReady,
} from './utils';

whenDocumentReady().then(() => {
  if ('customElements' in window) {
    customElements.define('land-glockenspiel', Glockenspiel);
    customElements.define('land-sidewalks', Sidewalks);
    customElements.define('land-tulgeywood', Tulgeywood);
  }
});

whenDocumentComplete().then(() => {
  if ('customElements' in window) {
    customElements.define('land-monorail', Monorail, {extends: 'nav'});
  }
});
