import {
  pxToRem,
  whenDocumentComplete,
  whenElementTransitionEnd,
} from './utils';

const ClassName = {
  // When component is ready.
  ACTION: 'action',

  // The train car that represents the website section the current page belongs to.
  ACTIVE: 'active',

  // When train has arrived and stopped.
  ARRIVE: 'arrive',

  // When train is about to depart.
  DEPART: 'depart',

  // The train element.
  TRAIN: 'monorail-train',

  // The container that contains the train element.
  STATION: 'monorail-station',
};

export default class extends HTMLElement {
  stationEl;
  trainEl;
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
    this.trainEl = this.querySelector(`.${ClassName.TRAIN}`);
    if (!this.stationEl || !this.trainEl) {
      return;
    }

    // this.decorate();
    this.activeCarEl = this.trainEl.querySelector(`.${ClassName.ACTIVE}`);

    this.isVisible = true;

    this.style.setProperty('--monorail-train-length',
        `${pxToRem(this.trainEl.scrollWidth)}rem`);

    whenElementTransitionEnd(this.trainEl, true).then(() => {
      let waitBeforeAddArriveClass = 0;

      if (this.hasScroll && this.activeCarEl) {
        const {
          x: activeCarX,
          width: activeCarWidth,
        } = this.activeCarEl.getBoundingClientRect();
        const scrollDistance = activeCarX + activeCarWidth / 2 -
            this.stationEl.getBoundingClientRect().width / 2;

        if (scrollDistance > 0) {
          this.stationEl.scrollBy(scrollDistance, 0);
          waitBeforeAddArriveClass = 1000;
        }
      }

      // Wait to set `arrive` class to give time for `this.adjust()` to finish
      // scrolling.
      setTimeout(() => this.classList.add(ClassName.ARRIVE),
          waitBeforeAddArriveClass);
    });

    this.observeVisibility();
    this.listenToClicks();

    whenDocumentComplete().then(() => this.classList.add(ClassName.ACTION));
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
      const aEl = evt.target?.closest('a');
      if (
        // Click didn’t happen on an <a> element.
        !aEl ||
        // The link is an external link.
        aEl?.host !== window.location.host ||
        // The link is an anchor link on the current page.
        (aEl?.pathname === window.location.pathname && aEl?.hash)
      ) {
        return;
      }

      evt.preventDefault();

      // Do nothing if the <a> element links to the current page.
      if (aEl.pathname === window.location.pathname) {
        return;
      }

      this.depart(aEl.href);
    });
  }

  depart(destination) {
    if (!this.isVisible) {
      window.location.assign(destination);
      return;
    }

    window.addEventListener('pagehide', () => {
      // Restore the class names right before page unload so if a user use
      // browser back/forward cache, the navigation will be there.
      this.classList.remove(ClassName.DEPART);
      this.classList.add(ClassName.ARRIVE);
    });

    whenElementTransitionEnd(this.trainEl, true).then(() => {
      window.location.assign(destination);
    });

    this.classList.remove(ClassName.ARRIVE);
    this.classList.add(ClassName.DEPART);
  }
}
