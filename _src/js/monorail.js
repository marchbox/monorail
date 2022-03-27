import {
  whenElementAnimationEnd,
  whenElementTransitionEnd,
} from './utils';

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

  get hasScroll() {
    return this.stationEl?.scrollWidth > this.stationEl?.offsetWidth;
  }

  connectedCallback() {
    if (!('IntersectionObserver' in window)) {
      return;
    }

    this.stationEl = this.querySelector(`.${ClassName.STATION}`);
    this.monorailEl = this.querySelector(`.${ClassName.MONORAIL}`);
    if (!this.stationEl || !this.monorailEl) {
      return;
    }

    this.decorate();
    this.activeCarEl = this.monorailEl.querySelector(`.${ClassName.ACTIVE}`);

    this.isVisible = true;

    this.style.setProperty('--monorail-length',
        `${this.monorailEl.scrollWidth / 16}rem`);

    whenElementAnimationEnd(this.monorailEl, true).then(() => {
      let waitBeforeAddArriveClass = 0;

      if (this.hasScroll) {
        this.activeCarEl.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
          inline: 'center',
        });
        waitBeforeAddArriveClass = 1000;
      }

      // Wait to set `arrive` class to give time for `this.adjust()` to finish
      // scrolling.
      setTimeout(() => this.classList.add(ClassName.ARRIVE),
          waitBeforeAddArriveClass);
    });

    this.observeVisibility();
    this.listenToClicks();
  }

  disconnectedCallback() {
    this.visibilityObserver?.disconnect();
  }

  decorate() {
    const engineHead = document.createElement('land-inlinesvg');
    engineHead.setAttribute('src', '/assets/decors/monorail-engine-head.svg');
    engineHead.setAttribute('aria-hidden', 'true');
    engineHead.setAttribute('width', '78');
    engineHead.setAttribute('height', '30');
    const engineTail = document.createElement('land-inlinesvg');
    engineTail.setAttribute('src', '/assets/decors/monorail-engine-tail.svg');
    engineTail.setAttribute('aria-hidden', 'true');
    engineTail.setAttribute('width', '78');
    engineTail.setAttribute('height', '30');

    this.monorailEl.prepend(engineHead);
    this.monorailEl.append(engineTail);
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
      const aEl = evt.target?.closest('a');
      if (!aEl || aEl?.host !== window.location.host || !this.isVisible) {
        return;
      }

      evt.preventDefault();
      const destUrl = aEl.href;

      // Do nothing if the <a> element links to the current page.
      if (destUrl === window.location.href) {
        return;
      }

      this.depart(destUrl);
    });
  }

  depart(destination) {
    whenElementTransitionEnd(this.monorailEl, true).then(() => {
      window.addEventListener('pagehide', () => {
        // Restore the class names right before page unload so if a user use
        // browser back/forward cache, the navigation will be there.
        this.classList.remove(ClassName.DEPART);
        this.classList.add(ClassName.ARRIVE);
      });
      window.location.assign(destination);
    });
    this.classList.remove(ClassName.ARRIVE);
    this.classList.add(ClassName.DEPART);
  }
}
