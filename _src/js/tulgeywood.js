import {
  getRandomFloat,
  getRandomInt,
  pxToRem,
} from './utils';

import cheshireSvg from '../svg/tulgeywood-cheshire.svg';
import upSvg from '../svg/tulgeywood-up.svg';
import thisWaySvg from '../svg/tulgeywood-this-way.svg';
import thatDirectionSvg from '../svg/tulgeywood-that-direction.svg';
import yonderSvg from '../svg/tulgeywood-yonder.svg';

const ClassName = {
  REVEAL: 'reveal',
  CHESHIRE: 'tulgeywood-cheshire',
  SIGN: 'tulgeywood-sign',
  SIGN_UP: 'tulgeywood-sign-up',
  SIGN_THIS_WAY: 'tulgeywood-sign-this-way',
  SIGN_THAT_DIRECTION: 'tulgeywood-sign-that-direction',
  SIGN_YONDER: 'tulgeywood-sign-yonder',
};

const REVEAL_ANIM_DELAY_RANGE = [1000, 3000];

const template = `
  <div class="${ClassName.CHESHIRE}" aria-hidden="true">
    ${cheshireSvg}
  </div>
  <div class="${ClassName.SIGN} ${ClassName.SIGN_UP}" aria-hidden="true">
    ${upSvg}
  </div>
  <div class="${ClassName.SIGN} ${ClassName.SIGN_THIS_WAY}" aria-hidden="true">
    ${thisWaySvg}
  </div>
  <div class="${ClassName.SIGN} ${ClassName.SIGN_THAT_DIRECTION}" aria-hidden="true">
    ${thatDirectionSvg}
  </div>
  <div class="${ClassName.SIGN} ${ClassName.SIGN_YONDER}" aria-hidden="true">
    ${yonderSvg}
  </div>
`;

export default class extends HTMLElement {
  timeout;
  figureEl;
  cheshireEl;

  connectedCallback() {
    this.figureEl = this.querySelector('figure')

    if (!this.figureEl) {
      return;
    }

    const tpl = document.createElement('template');
    tpl.innerHTML = template;

    this.figureEl.append(...tpl.content.children);
    this.cheshireEl = this.querySelector(`.${ClassName.CHESHIRE}`);

    this.setupCheshire();
  }

  disconnectedCallback() {
    clearTimeout(this.timeout);
  }

  setupCheshire() {
    const initDelay = getRandomInt(...REVEAL_ANIM_DELAY_RANGE);

    const reveal = () => {
      this.cheshireEl.addEventListener('animationend', () => {
        this.cheshireEl.classList.remove(ClassName.REVEAL);

        const delay = getRandomInt(...REVEAL_ANIM_DELAY_RANGE);

        this.timeout = setTimeout(() => reveal(), delay);
      }, {once: true});

      const {x, y, r} = this.getCheshireVariables();
      this.cheshireEl.style.setProperty('--x', `${pxToRem(x)}rem`);
      this.cheshireEl.style.setProperty('--y', `${pxToRem(y)}rem`);
      this.cheshireEl.style.setProperty('--r', `${r}deg`);
      this.cheshireEl.classList.add(ClassName.REVEAL);
    }

    this.timeout = setTimeout(() => reveal(), initDelay);
  }

  getCheshireVariables() {
    const {
      width: figureWidth,
      height: figureHeight,
    } = this.figureEl.getBoundingClientRect();
    const {width, height} = this.cheshireEl.getBoundingClientRect();
    const xRange = [
      -20,
      Math.min(figureWidth + 20 - width, visualViewport.width - width),
    ];
    const yRange = [
      -20,
      figureHeight + 20 - height,
    ];

    return {
      x: getRandomFloat(...xRange),
      y: getRandomFloat(...yRange),
      r: getRandomInt(-180, 180),
    };
  }
}
