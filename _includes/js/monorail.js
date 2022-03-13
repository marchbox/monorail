import * as Turbo from '@hotwired/turbo';

const PAGE_OUT_CLASSNAME = 'page-out';
let willNavigateAway = true;

export class Monorail extends HTMLElement {
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
      if (this.constructor.willNavigateAway && this.#shouldAnimate) {
        evt.preventDefault();
        document.body.classList.add(PAGE_OUT_CLASSNAME);
        this.querySelector('ul').addEventListener('animationend', () => {
          this.constructor.willNavigateAway = false;
          Turbo.visit(evt.detail.url);
        });
      }
    });

    document.documentElement.addEventListener('turbo:visit', () => {
      document.body.classList.remove(PAGE_OUT_CLASSNAME);
      this.constructor.willNavigateAway = true;
    });
  }

  disconnectCallback() {
    this.#intersectObserver?.disconnect();
  }
}
