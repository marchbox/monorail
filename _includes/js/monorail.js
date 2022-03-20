import {whenElementAnimationEnd} from './utils';

const ClassName = {
  ACTIVE: 'active',
  ARRIVE: 'arrive',
  DEPART: 'depart',
  OPERATE: 'operate',
};

export default class extends HTMLElement {
  monorailEl;
  isVisible;

  arrivalObserver;
  departureObserver;
  resizeObserver;
  visibilityObserver;

  get animationMode() {
    return getComputedStyle(this).getPropertyValue('--animation-mode');
  }

  connectedCallback() {
    if (!('ResizeObserver' in window) ||
        !('IntersectionObserver' in window)) {
      return;
    }
    this.monorailEl = this.querySelector('ul');
    this.isVisible = true;

    this.observeVisibility();
    this.observeResize();
    this.observeArrival();
    this.listenToClicks();

    this.classList.add(ClassName.OPERATE);
  }

  disconnectedCallback() {
    this.visibilityObserver?.disconnect();
    this.resizeObserver?.disconnect();
    this.arrivalObserver?.disconnect();
    this.departureObserver?.disconnect();
  }

  observeVisibility() {
    this.visibilityObserver = new IntersectionObserver(([entry]) => {
      this.isVisible = entry.isIntersecting;
    }, {
      // Only use page transition animation when at least half of the monorail
      // element is intersecting with the viewport.
      threshold: .5,
    });
    this.visibilityObserver.observe(this);
  }

  observeResize() {
    this.resizeObserver = new ResizeObserver(([entry]) => {
      if (entry.target.scrollWidth > entry.contentRect.width) {
        this.centerActiveCar();
      }
    });
    this.resizeObserver.observe(this.monorailEl);
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
    this.observeDeparture(destination);
    this.classList.remove(ClassName.ARRIVE);

    if (this.animationMode === 'transform') {
      this.classList.add(ClassName.DEPART);
    } else if (this.animationMode === 'scroll') {
      this.monorailEl.scrollTo(this.monorailEl.scrollWidth, 0);
    }
  }

  observeArrival() {
    if (this.animationMode !== 'scroll') {
      return;
    }

    let timeout;

    Promise.any([
      new Promise(resolve => {
        timeout = setTimeout(() => {
          resolve();
        }, 1000);
      }),
      new Promise(resolve => {
        const activeCarEl = this.querySelector(`.${ClassName.ACTIVE}`);
        const rootMarginInline = this.getBoundingClientRect().width / 2 -
            activeCarEl.getBoundingClientRect().width / 2;

        this.arrivalObserver = new IntersectionObserver(([entry], observer) => {
          if (entry.isIntersecting) {
            resolve();
          }
        }, {
          root: this,
          rootMargin: `0px -${rootMarginInline}px`,
          threshold: 1,
        });
        this.arrivalObserver.observe(activeCarEl);
      }),
    ]).then(() => {
      this.classList.add(ClassName.ARRIVE);
      this.arrivalObserver?.disconnect();
    });
  }

  observeDeparture(destination) {
    this.departureObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        this.isLastCarInitiallyIntersecting = true;
      }
      if (this.isLastCarInitiallyIntersecting && !entry.isIntersecting) {
        window.location.assign(destination);
      }
    }, {
      root: this,
    });
    this.departureObserver.observe(
        this.monorailEl.querySelector('li:last-child'));
  }

  centerActiveCar() {
    if (this.animationMode !== 'scroll') {
      return;
    }
    this.querySelector(`.${ClassName.ACTIVE}`)
        .scrollIntoView({block: 'end', inline: 'center'});
  }
}
