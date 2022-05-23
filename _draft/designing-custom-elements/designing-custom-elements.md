---
title: Designing custom elements
date: 2022-05-21
tags:
  - web-design
  - web-components
---

Custom elements enable web developers to share imperative functionalities declaratively, much like how built-in HTML elements work. Since creating custom elements is essentially exposing our JavaScript code through the HTML interface, we should follow HTML conventions to design our custom elements.

^^^

## Custom elements?

Custom elements are the core technology in the Web Components suite. There are many great resources to learn Web Components, I won’t say too much about the technology itself in this article, if you aren’t familiar with it, I highly recommend reading through the [Web Components section on MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and the [Custom elements section on the HTML Living Standard](https://html.spec.whatwg.org/dev/custom-elements.html).

## User experience

## Developer experience

Developer experience, or DevX, is the main reason I’m writing this article. If you’re creating a custom element, it’s highly likely because you want to share a set of functionalities with other developers, or at least your future self (and we all know how reading the code you wrote 2 weeks ago feels like you were reading someone else’s code 🤷).

When I use someone else’s code, I always appreciate the API is designed to be predictable—after I’ve learned the basics, I should be able to guess something that I haven’t learned. For example, if your library has a `getValue('foo')` method, I’d expect a `setValue('foo', 'bar')`, and even a `hasValue('foo')`, or maybe a `deleteValue('foo')`.

Predictable APIs usually are consistent, concise but descriptive, and readable.

### Consistent

### Concise but descriptive

### Readable

```js
new Promise(..)
  .then(..)
  .catch(..)
  .finally(..);
```

## Design custom elements like built-in HTML elements

### Attribute values

### Attributes or children

Is the value user-visible? If so, child elements, if no, attributes.

### Support global attributes

`hidden` and `:host([hidden])`.

### HTML design principles

[W3C’s HTML Design Principles](https://www.w3.org/TR/html-design-principles/)