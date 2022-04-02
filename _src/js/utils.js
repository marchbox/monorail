export function whenDocumentReady() {
  return new Promise(resolve => {
    if (['interactive', 'complete'].includes(document.readyState)) {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', () => resolve());
    }
  });
}

export function whenElementTransitionEnd(element, once = false) {
  return new Promise(resolve => {
    if (elementHasTransition(element)) {
      element.addEventListener('transitionend', () => {
        resolve();
      }, {once});
    } else {
      resolve();
    }
  });
}

export function elementHasTransition(element) {
  return element && getComputedStyle(element)
      .getPropertyValue('transition-duration') !== '0s';
}

export function whenElementAnimationEnd(element, once = false) {
  return new Promise(resolve => {
    if(elementHasAnimation(element)) {
      element.addEventListener('animationend', () => {
        resolve();
      }, {once});
    } else {
      resolve();
    }
  });
}

export function elementHasAnimation(element) {
  return element &&
      getComputedStyle(element).getPropertyValue('animation-name') !== 'none';
}

export function render(hostEl, template, styles = '') {
  let templateEl;

  if (typeof template === 'string') {
    templateEl = document.createElement('template');
    templateEl.innerHTML = template;
  }
  else if (template instanceof HTMLTemplateElement) {
    templateEl = template;
  }

  if (!templateEl) {
    return;
  }

  const children = [templateEl.content.cloneNode(true)];

  if (styles.trim()) {
    const styleEl = document.createElement('style');
    styleEl.textContent = styles;
    children.unshift(styleEl);
  }

  hostEl.append(...children);
}

export function pxToRem(px) {
  return px / 16;
}
