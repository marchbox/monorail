---
title: Extending browsers
date: 2022-05-28
tags:
  - web-design
---

## JavaScript is here to extend browser features

Before we get into how to design custom elements, I think it’s very important to understand why we want to build custom elements, and why we want to use JavaScript in the first place.

There’s a clear trend in the history of browser evaluation: a custom solution gets popular; the solution is abstracted, generalized, and eventually proposed to the web standards; browser vendors implement the new standard; developers remove the custom solution and use the built-in implementation. This has happened over and over again, the most famous one is jQuery’s [Sizzle selector engine](https://github.com/jquery/sizzle) which enabled the famous `$()` function and eventually got replaced by the built-in `querySelector()` and `querySelectorAll()` methods.

When developers switch from a custom solution, which usually requires adding some third-party JavaScript code to your website, to the built-in solution, it usually means less code for their customers to download and much better runtime performance.

In an ideal world, browsers would have all the features that developers ever possibly needed. But that’s obviously impossible. The next best thing would be for browsers to allow developers to create their custom solutions, and eventually adopt these solutions if it has broad benefits. This is why JavaScript exists.

Browser built-in features are (most of the time) performant, secure, and accessible. Because writing JavaScript is extending browser features, we should hold ourselves accountable for meeting or at least approaching the quality standards that browsers hold. Because we don’t want to let our customers have worse experiences with our custom solutions than the browser defaults. This also means we should avoid using JavaScript to solve something that other web technologies, like HTML and CSS, already have built-in solutions for.

