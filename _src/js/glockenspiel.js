import {
  render,
} from './utils';

import sun from '../svg/sun.svg';
import moon from '../svg/moon.svg';

const LOCAL_STORAGE_KEY = 'glockenspiel';
const Classes = {
  DAY: 'g-day',
  NIGHT: 'g-night',
};
const Titles = {
  DAY: 'Change to night mode? Your preference will be remembered.',
  NIGHT: 'Change to day mode? Your preference will be remembered.',
};

const styles = `
:host {
  display: block;
}

:host([hidden]) {
  display: none;
}

.container {
  block-size: 42px;
  inline-size: 42px;
  position: relative;
}

label {
  color: transparent;
  cursor: pointer;
  inset: 0;
  position: absolute;
  z-index: 2;
}

input {
  position: absolute;
  inset-block-start: -100px;
}

.icon {
  inset: 50% auto auto 50%;
  pointer-events: none;
  position: absolute;
  transform: translate(-50%, -50%) scale(var(--scale, 1)) rotate(10deg);
  transition: .24s var(--ease-bouncing);
  z-index: 1;
}

svg {
  display: block;
}

input:checked ~ .sun,
.moon {
  --scale: 0;
  opacity: 0;
}

input:checked ~ .moon {
  --scale: 1;
  opacity: 1;
}
`;

const template = `
  <div class="container">
    <label for="night">Night mode?</label>
    <input type="checkbox" id="night" name="night">
    <div class="icon sun">${sun}</div>
    <div class="icon moon">${moon}</div>
  </div>
`;

export default class Glockenspiel extends HTMLElement {
  shadow;
  isNight = false;

  constructor() {
    super();

    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    this.isNight = stored ?
        stored === Classes.NIGHT :
        matchMedia('(prefers-color-scheme: dark)').matches;

    this.shadow = this.attachShadow({mode: 'open'});
  }

  connectedCallback() {
    render(this.shadow, template, styles)

    const container = this.shadow.querySelector('.container');
    container.title = this.isNight ? Titles.NIGHT : Titles.DAY;

    const checkbox = this.shadow.querySelector('input');
    checkbox.checked = this.isNight;

    checkbox.addEventListener('change', () => {
      this.isNight = checkbox.checked;
      localStorage.setItem(LOCAL_STORAGE_KEY,
          this.isNight ? Classes.NIGHT : Classes.DAY)
      document.documentElement.classList.toggle(Classes.DAY, !this.isNight);
      document.documentElement.classList.toggle(Classes.NIGHT, this.isNight);
      container.title = this.isNight ? Titles.NIGHT : Titles.DAY;
    });
  };
}
