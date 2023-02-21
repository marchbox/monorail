import 'regenerator-runtime/runtime';
import '@ungap/custom-elements-builtin';

import Ben from './ben';
import Glockenspiel from './glockenspiel';
import Monorail from './monorail';
import MonorailWithBen from './monorail-with-ben';
import Sidewalks from './sidewalks';
import Tulgeywood from './tulgeywood';
import {
  whenDocumentComplete,
  whenDocumentReady,
} from './utils';

const supportNavigation = 'navigation' in window;

if (supportNavigation) {
  new Ben();
}

whenDocumentReady().then(() => {
  if ('customElements' in window) {
    customElements.define('land-glockenspiel', Glockenspiel);
    customElements.define('land-sidewalks', Sidewalks);
    customElements.define('land-tulgeywood', Tulgeywood);
  }
});

whenDocumentComplete().then(() => {
  if ('customElements' in window) {
    const MonorailClass = supportNavigation ? MonorailWithBen : Monorail;
    customElements.define('land-monorail', MonorailClass, {extends: 'nav'});
  }
});
