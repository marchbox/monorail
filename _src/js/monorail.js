import {whenElementAnimationEnd} from './utils';

const ClassName = {
  ACTIVE: 'active',
  ARRIVE: 'arrive',
  DEPART: 'depart',
  MONORAIL: 'monorail',
  STATION: 'monorail-station',
};

export default class extends HTMLElement {
  stationEl;
  monorailEl;
  activeCarEl;

  visibilityObserver;
  isVisible;

  connectedCallback() {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    this.stationEl = this.querySelector(`.${ClassName.STATION}`);
    this.monorailEl = this.querySelector(`.${ClassName.MONORAIL}`);
    this.activeCarEl = this.monorailEl?.querySelector(`.${ClassName.ACTIVE}`);
    if (!this.stationEl || !this.monorailEl) {
      return;
    }

    this.isVisible = true;

    this.style.setProperty('--monorail-length',
        `${this.monorailEl.scrollWidth / 16}rem`);

    this.observeVisibility();

    whenElementAnimationEnd(this.monorailEl, true).then(() => {
      this.activeCarEl.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'center',
      });
      // Wait to set `arrive` class to give time for `this.adjust()` to finish
      // scrolling.
      setTimeout(() => this.classList.add(ClassName.ARRIVE), 1000);
    });

    this.listenToClicks();
  }

  disconnectedCallback() {
    this.visibilityObserver?.disconnect();
  }

  // Only use page transition animation when at least half of the monorail
  // element is intersecting with the viewport.
  observeVisibility() {
    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      this.isVisible = entry.isIntersecting;
    }, {
      threshold: .5,
    });
    this.visibilityObserver.observe(this);
  }

  listenToClicks() {
    document.body.addEventListener('click', evt => {
      // Do nothing if the clicked target isn’t an <a> element, or
      // the <a> element links to an external URL.
      if (evt.target?.nodeName !== 'A' ||
          evt.target?.host !== window.location.host ||
          !this.isVisible) {
        return;
      }

      evt.preventDefault();
      const destUrl = evt.target.href;

      // Do nothing if the <a> element links to the current page.
      if (destUrl === window.location.href) {
        return;
      }

      this.depart(destUrl);
    });
  }

  depart(destination) {
    whenElementAnimationEnd(this.monorailEl, true).then(() => {
      window.location.assign(destination);
      // Restore monorail position so that if user uses browser back button to
      // go back to the previous page, the navigation will be visible,
      setTimeout(() => {
        this.classList.remove(ClassName.DEPART);
        this.classList.add(ClassName.ARRIVE);
      }, 2);
    });
    this.classList.remove(ClassName.ARRIVE);
    this.classList.add(ClassName.DEPART);
  }
}
