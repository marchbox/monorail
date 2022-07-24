---
title: Generate letter-based default avatars in JavaScript
tags:
  - web-design
  - javascript
date: 2022-07-23
---

Many websites take the first letters from a user’s names to generate their default avatar. It is similar to [monograms](https://en.wikipedia.org/wiki/Monogram). If you have to achieve this in JavaScript, I found using Unicode property escapes Regular Expressions is the easiest.

^^^

I recently worked on a React and GraphQL based project. In our project, we asked users to set their display names, but they don’t have to use their real names, it’s a single text field with a limit of 30 characters.

Based on the product specification, a user’s default avatar, if they haven’t uploaded an image, should be the first character of their display name contained in a circle with a background color.

<figure>
  <img src="{{'avatar-example.png'|url|imgUrl(page)}}" alt="A circle with a light to darker blue gradient background, and a letter “A” in the center." width="96" height="96">
  <figcaption>An example avatar.</figcaption>
</figure>

The chosen character must be one that is commonly used as a “letter” in any given language. For example, a Latin letter like “A”, a Chinese character like “<span lang=“zh-Hans”>赵</span>”. But it shouldn’t be an emoji, a symbol, or punctuation. For example, if your display name is “🍣~Sushi Lover~”, your default avatar should display a letter “S”.

Because this is about text processing, I thought I should explore my options with Regular Expression first. And luckily, I found [Unicode property escapes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes). Here is my code:

```js
function getMonogram(name) {
  try {
    // Match General_Category=Letter
    const match = name.match(/\p{L}/u);
    return (match && match[0]) || null;
  } catch {
    return name[0] || null;
  }
}
```

It has [great browser support](https://caniuse.com/mdn-javascript_builtins_regexp_property_escapes). Here are a few things worth noting:

* Because it’s an escape, you do need that `\p{..}`. You can also use `\P{..}` for negation.
* The Regular Expression in my code is a shorthand of `/\p{General_Category=Letter}/`, because you don’t need property name (`General_Category`) for General categories, and `Letter` can be shortened to `L`.
* You need that `u` flag to tell JavaScript that you are trying to match based on Unicode code points.
* Based on my reading and testing, this Regular Expression seems to cover all cases. I tested in Latin script (with and without accent), Simplified Chinese, Japanese (Hiragana), Arabic, Hebrew, and Korean (Hangul). I may have missed some cases, I’ll update the article if I found any.

You can do so much more with it. It’s particularly useful when you need to handle non-Latin cases. Since this is all new to me, I’m gonna stop here before I spread any misinformation. But I recommend to dig into the [MDN article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Unicode_Property_Escapes) and those linked standard pages if you want to do more research.
