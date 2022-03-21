export function whenDocumentReady() {
  return new Promise(resolve => {
    if (['interactive', 'complete'].includes(document.readyState)) {
      resolve();
    } else {
      document.addEventListener('DOMContentLoaded', () => resolve());
    }
  });
}

export function whenElementAnimationEnd(element, once = false) {
  return new Promise(resolve => {
    if(element && elementHasAnimation(element)) {
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
