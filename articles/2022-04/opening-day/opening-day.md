---
title: Opening day
date: 2022-04-10
tags:
  - dumpling
  - mouse
  - pixel
excerpt: |
  After almost 7 months of procracination in the quarantine, today I’m finally ready to open Web Components Land, a website dedicated to learning Web Components and making them inclusive, resilient, and useful.
---

After almost 7 months of procracination in the quarantine, today I’m finally ready to open Web Components Land, a website dedicated to learning Web Components and making them inclusive, resilient, and useful.

I believe web designers and developers have a responsibility of making the web accessible and useful for everyone. The easiest and most robust way of achieving that is building well-structured HTML and progressively enhance with CSS and JavaScript. So, before we move forward, I’d like to clarify that, while Web Components is a JavaScript-required solution, I’m not advocating for using JavaScript by default and for everything. Progressively enhancing webpages from JavaScript-absent scenarios doesn’t mean taking away all the goodness and power that comes with JavaScript, it’s simply the most robust way of building webpages because a webpage doesn’t require JavaScript, nor even CSS, it only requires HTML. With that, let’s move on.

## What are Web Components?

There are so many articles about Web Components, I recommend the ones on [MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components) and [CSS-Tricks](https://css-tricks.com/guides/web-components/). I will also write about the foundations and deep-dives of all aspects of Web Components in future articles, but here is a simple introduction in case you aren’t familiar with it.

Web Components is a collection of web technologies that allow developers to encapsulate features into reusable HTML-like elements. A few core technologies include [custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html "Link to the custom element spec"), [shadow DOM (shadow tree)](https://dom.spec.whatwg.org/#shadow-trees "Link to the DOM spec"), and [HTML templates](https://html.spec.whatwg.org/multipage/scripting.html#the-template-element "Link to the HTML template element spec"). Each of these technologies can be used independently, but custom elements is at the center.

A custom element is like an HTML element, but custom defined using JavaScript. Here is how to create and use a minimal custom element in HTML:

```js
<!DOCTYPE html>
<html lang="en">
  <meta charset="utf-8">
  <title>Castle catalog</title>

  <style>
    land-castle {
      display: block;
    }

    .sleeping-beauty {
      background-color: pink;
    }

    .cinderella {
      background-color: blue;
    }
  </style>

  <script>
    customElements.define('land-castle', class extends HTMLElement {});
  </script>

  <h1>Castle catalog</h1>

  <land-castle class="sleeping-beauty">
    Sleeping Beauty Castle
  </land-castle>

  <land-castle class="cinderella">
    Cinderella Castle
  </land-castle>

  <script>
    const shanghaiCastle = document.createElement('land-castle');
    shanghaiCastle.classList.add('enchanted-storybook');
    shanghaiCastle.textContent = 'Enchanted Storybook Castle';

    document.querySelector('.cinderella')
        .insertAdjacentElement('afterend', shanghaiCastle);
  </script>
</html>
```

You can use a custom element just like any HTML element, begin with an opening tag (`<land-castle>`), add some attributes (`class="..."`), optionally add some content inside it, then end with a closing tag (`</land-castle>`). And you can follow general HTML syntax to place them in your document. We can even use DOM API to create a new instance of `<land-castle>` and place it in the document, again, just like how we can do it with any HTML element.

One major difference between a custom element and an HTML element is that you have to provide a custom definition, while an HTML element’s definition is native in browsers. The definition is added in JavaScript by using `customElements.define(..)`. 

A custom element definition consists of [many parts](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-definition "LInk to HTML Standards about custom element definition."), but 2 of them are required:

- A name, in our case, `land-castle`. A valid custom name must start with an English letter and contain at least one hyphen (`-`). There’s more to this requirement [in the HTML spec](https://html.spec.whatwg.org/multipage/custom-elements.html#valid-custom-element-name "Link to custom element name requirements in the HTML spec").
- A JavaScript class. In our case, it’s just an empty anonymous class that inherits from `HTMLElement`. It looks useless now as it doesn’t seem to do anything, except it does a lot. It’s important to know that all custom element classes must directly or indirectly inherit from `HTMLElement`, when you do that, the browser add all sorts of functionalities that an HTML element has to the custom element, e.g. it gains access to `classList`, `dataset`, `appendChild(..)`, etc. Our `land-castle` is basic similar to an `<span>` element, I’m not saying `<div>` is because all custom elements are by default inline elements. That’s why we have `land-castle {display: block}` in the CSS. We will talk about better way of doing this in the future.

Now we have a basic cusotm element, let’s make it do something.

```js
customElements.define('land-castle', class extends HTMLElement {
  celebrate(holiday) {
    switch (holiday) {
      case 'halloween':
        console.log('Halloween Screams');
      case 'christmas':
        console.log('Believe… In Holiday Magic');
      default:
        console.log('Disneyland Forever');
    }
  }
});
```

We extended our “useless” JavaScript class with a method called `celebrate(..)`. We can use it in JavaScript like so:

```js
document.querySelector('.sleeping-beauty').celebrate('halloween');
document.querySelector('.cinderella').celebrate('christmas');
```

Now we can sit back and enjoy the fireworks! Just like how you would call a method on any native HTML element, you can use any DOM method to get an instance of the `land-castle` element and call one of its method immediately.

We can pack functionalities into a custom element and reuse them either with HTML or JavaScript as we’ve seen. But we also mentioned encapsulation, that’s where shadow DOM comes in.

```js
customElements.define('land-castle', class extends HTMLElement {
  constructor() {
    super();

    this.shadow_;
  }

  connectedCallback() {
    this.shadow_ = this.attachShadow({mode: 'open'});
    this.shadow_.innerHTML = 'Welcome to <slot></slot>!';
  }

  celebrate(holiday) {
    switch (holiday) {
      case 'halloween':
        console.log('Halloween Screams');
      case 'christmas':
        console.log('Believe… In Holiday Magic');
      default:
        console.log('Disneyland Forever');
    }
  }
});
```

We added `constructor(..)` and `connectedCallback(..)` to our class. For the brevity of this article, I’ll ignore them for now and come back to them in future articles. But let’s pay attention to the shadow. First we declared `this.shadow_` in the constructor function, and assigned the result of `this.attachShadow(..)`  to it. `attachShadow(..)` creates something called a shadow tree (or shadow DOM) and returns the root of this tree named shadow root, this shadow root is what’s got assigned to `this.shadow_`. We also added some HTML to the shadow tree by assigning the HTML code to the shadow root’s `innerHTML`. This looks very similar to how you can add children elements and content to a native HTML element. That’s because a shadow root is somewhat similar to `document`. `document` is the root of a webpage’s DOM tree, likewise a shadow root is the root of a custom element’s shadow DOM tree. Take our cinderella castle case, the DOM tree looks like this:

```
#document
  └ html
      ├ head
      │   └ ...
      └ body
          ├ ...
          ├ land-castle.cinderella
          │   └ #shadow-root
          │       ├ #text ("Welcome to ")
          │       ├ slot
          │       └ #text ("!")
          └ ...
```

Shadow root creates a boundary, that keeps its descendents encapsulated in a different context from the rest of the DOM tree (which can be referred as a light tree). The benefits of this encapsulation include: CSS styles defined on the light tree won’t leak into the shadow tree (not always true but we’ll discuss in future articles) or vice versus; we can legally use the same `id` in a shadow tree and its light tree; and much more.

This is an extremely simplified introduction to Web Components. For this article, let’s move on to the next topic, we have all the future articles to explore every corner of Web Components.

## HTML is elegant

HTML is usually perceived as simple and basic, anyone can pick it up quickly, it’s not worth spending time to learn because what’s there to learn? But is it?

This common false perception is because HTML has a friendly interface, just like Google’s search homepage. The simple and almost boring syntax makes it approachable. Need to mark up a list? Of course you want something to say “I want a list” (`<ul>`) and “here are all the items in the list” (`<li>`). Need to embed a video? Just say “I want a video here” (`<video>`). Need a button?  No guess work, just add a button (`<button>`).

HTML is also very concise. Because it’s declarative, you don’t have to provide a step-by-step instruction to add something to a webpage. Need an image? No need to care how to fetch the image resource, how to render all the pixels in the image, how to figure out the size the image and push other content around. You simple tell browsers that “I want an image” (`<img>`), “here is the URL” (`src="..."`), and “use this text alternatively if you can’t display it” (`alt="..."`).

And last but not least, HTML is low maintenance. If you make a mistake in your HTML code, browser won’t complain about it, it’ll try to figure something out. If it can’t, it’ll ignore it or treat it as plain text. While this is not necessarily always the best for developers (because it makes it harder to discover issues sometimes), but it’s benefitial to your audience, they don’t have to scratch their head to figure what they did wrong, most of the time at least.

HTML hides all the complexities behind the scenes, and offers developers an elegant interface to work with.

## JavaScript extends browsers

Over the years, thanks to the community and the people who work on web standards, we have seen more and more features migrated from JavaScript-required to browser natives, e.g. form validation, video/audio players, animations, the list goes on and on. These native features are usually more robust, more intuitive, and more performant than their JavaScript-required solutions.

However, just like hiring more people alone won’t solve your company’s resource issues, having more native features won’t make the web demand any less JavaScript. On one hand, it takes time for a commonly needed pattern to mature and become part of the standards eventually. On the other hand, so many of these patterns have specific use cases, it’s hard to abstract and generalize them. But in either case, JavaScript-based custom solutions are needed because (and should be only because) what we need are not natively supported by browsers, at least not yet. We need JavaScript to extend browser features.

## Best of both worlds

HTML is concise and intuitive, it has quite a low learning curve. JavaScript has a more steep learning curve than HTML, but it provides so much flexibility for web developers to create custom solutions. Web Components combines the best of both worlds. When you create a Web Component, you can pack the component with complex custom fancy JavaScript (responsibly of course) but still offer your peer developers an elegant and declarative API like an HTML element. This is what makes me so excited about Web Components and drives learning and using it more.

What we have said are just in theories. How can we leverage the concept and actually make the best out of both worlds?

In the HTML spec’s [custom elements introduction section](https://html.spec.whatwg.org/multipage/custom-elements.html#custom-elements-intro), the spec stated:

> Custom elements are part of a larger effort to "rationalise the platform", by explaining existing platform features (like the elements of HTML) in terms of lower-level author-exposed extensibility points (like custom element definition).

We can understand this as, from an HTML author’s perspective, native HTML elements and custom elements should work similarly. How native HTML elements work should guide the custom element spec, and custom element spec should be able to explain how native HTML elements work (although there’s still a big gap before we achieve this).

This makes it clear that, when we design a component, other than making sure the component is accessible, robust, performant, and easy to use, we should also consider developer experience. The components should not only leverage HTML syntax, but also follow the native HTML API conventions to provide intuitive, concise, and predictable API for developers to use to interact with the rest of their frontend code.

## Enough of “… in future articles”

Yeah, I said that a lot in this article. I have been putting a lot of personal and work time into learning and building Web Components in the past year and half. I have accumulated so many thoughts and practices and I can’t wait to share with the community. Here are a few things that you can expect to read on this websites:

- Introductions to core Web Components technologies (custom elements, shadow DOM and slots, HTML templates, Element Internals, CSS Shadow Parts, etc.), proposed technologies like HTML Modules, other related technologies like custom events, `MutationObserver`, etc.
- Deep-dives into particular topics, e.g. what is custom element upgrade? How do custom element reactions work when a custom element has child custom elements?
- Custom element API design
- Accessibility in Web Components
- Progressively enhance the content with Web Components
- Visual and interaction design in Web Components
- Styling Web Components with CSS
- Industry news and resources

This list may grow longer, and I already have a pretty good article line-up.

I have been doing professional web development since I graduated college in 2006, and the first time I heard about Web Components was in early 2012, but I’ve only been hands-on since March 2019, so I’m not an expert on this subject. But I think I have pretty good understanding to web design and development in general, I believe my experience and ideas can help other developers understand certain topics better and save some time. There might be times that I make mistakes in a technology introduction article, or I feel strongly about a practice but found out it wasn’t the best later, when they happen, I will update the existing articles, and post changes in the [Changelog](/changelog).

I would also love to learn from the community, and the best way to do it is to let people know my ideas so that we can have some discussions. If you want to get in touch, you are very welcome to email me at <marchbox@hey.com> or you can find me on Twitter with [@marchbox](https://twitter.com/marchbox).
