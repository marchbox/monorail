import * as Turbo from '@hotwired/turbo';

export class Monorail extends HTMLElement {
  static ClassName = {
    ACTIVE: 'active',
    PAGE_OUT: 'page-out',
  };
  static willNavigateAway = true;

  #shouldAnimate = true;
  #intersectObserver;

  connectedCallback() {
    this.#intersectObserver = new IntersectionObserver(entries => {
      this.#shouldAnimate = entries[0].isIntersecting;
    }, {
      // Only use page transition animation when at least half of the monorail
      // element is intersecting with the viewport.
      threshold: .5,
    });
    this.#intersectObserver.observe(this);

    document.documentElement.addEventListener('turbo:before-visit', evt => {
      if (this.constructor.willNavigateAway &&
          this.#shouldAnimate &&
          evt.detail.url !== window.location.href) {
        evt.preventDefault();
        document.body.classList.add(this.constructor.ClassName.PAGE_OUT);
        this.querySelector('ul').addEventListener('animationend', () => {
          this.constructor.willNavigateAway = false;
          Turbo.visit(evt.detail.url);
        });
      }
    });

    document.documentElement.addEventListener('turbo:visit', () => {
      document.body.classList.remove(this.constructor.ClassName.PAGE_OUT);
      this.constructor.willNavigateAway = true;
    });
  }

  disconnectCallback() {
    this.#intersectObserver?.disconnect();
  }
}
