---
title: Gradient background with transparent borders
tags:
  - webdesign
  - css
date: 2023-03-17
---

Everybody is asking about how to create gradient borders with transparent backgrounds. But I just had to solve an issue that’s in the opposite situation and learned about `background-origin`.

^^^

## The issue

I have an element that has a CSS gradient as a background, adding transparent borders would create something like this:

<figure>
  <img src="./example-border-width-2px.jpg" width="143" height="67" alt="A square box with “Hello world” inside. The box has a red-to-blue gradient in the background, but its top and bottom borders also have similar gradients, and its left border is seemingly blue, and the right one is seemingly red.">
  <figcaption>
    Example with 2px borders. View details on <a href="https://codepen.io/marchbox/professor/gOdjpbJ">CodePen</a>
  </figcaption>
</figure>

Notice the different colors on the borders? Here is the CSS code:

```css
div {
  background: linear-gradient(45deg, red, blue);
  border: 2px solid transparent;
}
```

It’s a bit hard to understand what’s going on. So I bumped up the `border-width` to `20px`. And now it looks like this:

<figure>
  <img src="./example-border-width-20px.jpg" width="179" height="103" alt="A square box with “Hello world” inside. The box’s padding area has a red to blue gradient, its 4 borders (which are 20px thick) and the 4 corners all have similar gradients.">
  <figcaption>
    Example with 20px borders. View details on <a href="https://codepen.io/marchbox/professor/gOdjpbJ">CodePen</a>
  </figcaption>
</figure>

Now it’s clear, it appears that the gradient background, which is technically a `background-image`, is repeating itself. If the borders had colors, they’ll cover up the extra repeats, so normally I wouldn’t notice this. But now I set border colors to be `transparent`, I can see the repeats now.

<figure>
  <img src="./background-repeat.jpg" width="417" height="189" alt="A nine grid, the center box is the original square box that has “Hello world” inside, the other 8 boxes are illustrations of how the background is repeating into the border areas. Sorry, this image is hard to describe with words.">
  <figcaption>How the background repeats itself within the border box.</figcaption>
</figure>

Why this is happening? Now introducing `background-origin`.

## `background-origin`

The CSS [`background-origin`](http://developer.mozilla.org/en-US/docs/Web/CSS/background-origin) property sets where the background’s top left corner should start. Its value is one of the following keywords (other than the global values like `inherit`):

- `border-box`: Align the background’s top left corner with the border box.
- `padding-box`: Align the background’s top left corner with the padding box. This is the default value, which makes sense, because why would you want to hide part of the background behind the borders?
- `content-box`: Align the background’s top left corner with the content box, which means the padding areas won’t get any background.

This is a CSS property I knew of before but never paid much attention to, until now. After I added `background-origin: border-box`, the problem was solved!

```css
div {
  background: linear-gradient(45deg, red, blue) border-box;
  border: 2px solid transparent;
}
```

<figure>
  <img src="./background-origin-border-box.jpg" width="178" height="103" alt="A square box with “Hello world” inside. The box has a red-to-blue gradient in the background, and no more strange gradients on borders, or any visible borders at all.">
  <figcaption>Issue fixed, the background gradient run throughout the padding box now.</figcaption>
</figure>
