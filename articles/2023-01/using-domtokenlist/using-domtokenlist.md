---
title: Using DOMTokenList
tags:
  - web-design
  - javascript
  - intl-elements
date: 2023-01-04
---

[`DOMTokenList`](https://github.com/marchbox/intl-elements) is a built-in DOM interface that represents a set of string tokens. If you are familiar with `classList`, you are already familiar with it. In a recent project, I wanted to make a custom element property as a `DOMTokenList`, here’s what I learned.

^^^

## Why use `DOMTokenList`?

Take the `class` attribute as an example, its value is a list of space-separated strings. If you want to add new classes, it’s relatively easy, but don’t forget to check if the new class already exists. And if you were to remove a class or replace one with another, it’ll involve more string manipulation or even regular expressions. But with the `classList` property, which is a reflection of the `class` attribute’s value, it’s much easier to change the class list, you can use methods like `add()`, `remove()`, `replace()`, `toggle()`, etc, you can also access individual classes with `item()` method or the bracket notation (e.g., `classList[0]`). In summary, a `DOMTokenList` takes a list of space-separated strings and makes it structural, and any updates on the structure will be reflected in the original list of strings.

[`intl-elements`](https://github.com/marchbox/intl-elements) is the project I’ve been working on, I won’t go into details of the project, that’ll be articles for other days. But in short, it’s a collection of custom elements that makes it easy to use the [`Intl` API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) declaratively. One of the key features of this library is for component users to pass in a list of locales to the custom elements, so that they can use these locales with `Intl` APIs to format strings. The attribute to pass in the locale list is `locales`, and I thought it would be nice to create a `localeList` property as a `DOMTokenList` so that authors can easily change the locale list, just like how `class` attribute and `classList` property work.

## Implementing `DOMTokenList`

If you type “DOMTokenList” in a browser developer console, you can see the interface is exposed in the global context. But if you try to call it or create an instance with the `new` operator, browsers will throw `TypeError: Illegal constructor`. This is similar to the `CustomElementRegistry` interface. Because both are interfaces, not classes, you can’t instantiate them. However, browsers exposes `window.customElements` as an implementation of the `CustomElementRegistry` interface, so that developers can use it directly, e.g. `customElements.define()`. For `DOMTokenList`, there’s no such existing implementation in the global context. So I thought I could just implement one myself since it doesn’t seem to be very complicated. If you are interested in the implementation, here is the [source code](https://github.com/marchbox/intl-elements/blob/12e85bebdc6bec2a7a87d7fba64b92b8437f75f6/src/utils/locale-list.ts).

For the most part, the implementation was straightforward, I created a private property `#list` to store the actual locale list as an `Array`, and did some string parsing and manipulation to implement methods like `add()`, `remove()`, `replace()`, `toggle()`, `entries()`, `item()`, `values()`, etc.

To inform the custom elements that the list has been updated, I added a method, `onChange()`, so custom elements can call it and pass in callback functions, similar to how `addEventListener()` works. Any list-changing methods will execute all the callback functions so that the custom elements can update their internal states.

So far it’s all good, until I was stuck on how to allow accessing list items via the bracket notation, e.g. `myElement.localeList[1]`. I ended up looping through the private property, `#list`, and adding indexed getters (accessing list items is read-only):

```js
this.#list.forEach((el, i) => {
  Object.defineProperty(this, i, {
    configurable: true,
    get: () => el,
    set: () => {},
  });
});
```

And inside list changing methods like `add()`, I had to first clear out all these getters and set them again, the clearing looks like this:

```js
this.#list.forEach((_, i) => {
  Object.defineProperty(this, i, {
    get: () => undefined,
  });
});
```

This implementation worked, but it didn’t feel right. It felt like over-engineered and fragile, and when I was trying to print out an element’s `localeList` in a browser developer console, the output looked messy, not as clean as a `classList` would. That’s when I found [this StackOverflow answer](https://stackoverflow.com/a/29656169), suggesting to just using a `classList`.

## Using `classList`

On the high level, the idea is to create an HTML element without connecting it to `document`, and use its `classList` as the `localeList`.

First, I created a function for creating the `localeList` in custom elements:

```js
function createLocaleList(initialValue, onChange) {
  const hostingElement = document.createElement('div');
  const localeList = hostingElement.classList;
  localeList.value = initialValue ?? '';

  let observer;
  if (typeof onChange === 'function') {
    observer = new MutationObserver(() => {
      onChange();
    });
    observer.observe(hostingElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  return localeList;
}
```

In a custom element definition, I could call this function like so:

```js
class MyElement extends HTMLElement {
  // ...

  #localeList;

  get localeList() {
    return this.#localeList;
  }

  connectedCallback() {
    this.#localeList = createLocaleList(
      this.getAttribute('locales');
      () => {
        this.setAttribute(this.#localeList.value);
        // And maybe re-render the element’s content
        // based on the new locales.
      }
    );
  }

  // ...
}
```

Since I created a `MutationObserver` during the `localeList` creation, it would be a good idea to disconnect the observer when the custom element is disconnected (removed) from the DOM. So I added a `__destroy__()` method, the underlines are just to mark the method as special since it’s only intended to be used inside the custom elements, not by custom element users.

```js
function createLocaleList(initialValue, onChange) {
  // ...

  Object.defineProperty(localeList, '__destroy__', {
    value: function() {
      observer?.disconnect();
    },
  });

  // ...
}
```

Then I can call it in the custom element’s `disconnectedCallback()`:

```js
class MyElement extends HTMLElement {
  // ...

  disconnectedCallback() {
    this.#localeList.__destroy__();
  }

  // ...
}
```

Last but not least, since the items of a locale list should be valid language tags, I should implement `DOMTokenList`’s `supports()` method. A `localeList` belongs to a custom element, which is designed for a particular `Intl` API, and each `Intl` API has a `supportedLocalesOf()` method to check support. Hence, I need to know which `Intl` API when creating the locale list.

```js
function createLocaleList(intl, initialValue, onChange) {
  // ...

  Object.defineProperties({
    'supports': {
      value: function(locale) {
        if ('supportedLocalesOf' in intl) {
          return intl.supportedLocalesOf(locale).length > 0;
        }
        return true;
      }
    },
    '__destroy__': {/* ... */},
  });

  // ...
}
```

Now custom element users can check if a locale is supported by the custom element’s internal `Intl` object:

```js
if (myElement.localeList.supports('es-JP')) {
  myElement.localeList.add('es-JP');
} else {
  myElement.localeList.add('es');
}
```

Note that I could also use other `DOMTokenList`, like `part`. But `classList` has much better cross-browser support. Also, unlike `relList`, it doesn’t define the `supports()` method, so I don’t have to override any built-in functionality to add `supports()` to `localeList`.

If you are interested in the new implementation, [here is the source code](https://github.com/marchbox/intl-elements/blob/697a56cdb4b70995e8357ee237d83a7029b455e3/src/utils/locale-list.ts).

## Conclusion

I think `DOMTokenList` is a very useful interface, especially for custom elements. When developers use our custom elements, they should feel familiar with the APIs like writing HTML code, and making some custom element properties as `DOMTokenList` would help with that. I wish we could get a better way to create `DOMTokenList`s in the future, maybe something like `element.createDOMTokenList()`?
