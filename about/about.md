---
layout: post.njk
title: About
eleventyNavigation:
  key: About
  order: 4
---

## The author

My name is Zacky Ma. I’m a web developer who enjoys drawing and loves Disney. As a web developer, I advocate for inclusive websites that follow the Web Standards, and I prioritize usability, accessibility, performance, maintainability, and localization.


## The design

I grew up in the far west part of mainland China, and the internet wasn’t a thing until I was in high school. So Disney was my window to the outside world. My love for Disney has driven me through almost all significant changes in my life. So I weaved that love into the design of this website.

I designed the website logo as the old Disneyland park entrance sign.

<figure>
  <img src="{{'disneyland-sign.jpg'|url|imgUrl(page)}}" alt="An old photo of the Disneyland entrance sign.">
  <figcaption>
    Disneyland entrance sign. Photo by Werner Weiss, 1974.
    (Source: <a href="https://www.yesterland.com/disneylandsign.html">Yesterland</a>)
  </figcaption>
</figure>

The navigation in the header is a tribute to my favorite [Disney.com design (circa the early 2000s)](https://www.webdesignmuseum.org/gallery/disney-2001 "Link to Web Design Museum"): the main navigation was a monorail referencing the famous Disney Park monorail systems. I thought it was a clever idea for the brand continuation to bring the Disney magic from the real world to the online world.

<figure>
  <img src="{{'disneycom-2001.jpg'|url|imgUrl(page)}}" alt="">
  <figcaption>
    A later iteration of the design in 2006, the best I could find.
    (Source: <a href="https://www.webdesignmuseum.org/gallery/disney-2001">Web Design Museum</a>)
  </figcaption>
</figure>

Unlike today, it was a time when websites looked all different from each other, the web design was more experimental and interesting. It seems the industry is trending in that direction again. Hopefully, the web will look more diverse in a few years without repeating Flash’s closeness, lack of security, and poor accessibility.

The dark mode design is inspired by Disneyland’s classic [Main Street Electrical Parade](https://en.wikipedia.org/wiki/Main_Street_Electrical_Parade).


## The assets

The monospace fonts used in all code samples belong to the font family called [Mono Lisa](https://monolisa.dev). I was going to use [Source Code Pro](https://fonts.google.com/specimen/Source+Code+Pro) to be consistent with the body type ([Source Sans Pro](https://fonts.google.com/specimen/Source+Sans+Pro)) and heading type ([Source Serif Pro](https://fonts.google.com/specimen/Source+Serif+Pro)). But I do find Mono Lisa’s larger counter and taller x-height design more appealing and legible.

The primary logotype (“MarchBox”) uses [Parkly](https://simplebits.com/collections/fonts/products/parkly-font), made by the great [SimpleBits](https://simplebits.com). I like that each letter has friendly rounded edges while maintaining a square shape, the friendliness fits the Disneyland vibe, and the square shape fits the logo design. Plus, *the name*! The secondary logotype uses [Asap Condensed](https://fonts.google.com/specimen/Asap+Condensed).

The website is built with the Node.js-based static site generator, [Eleventy](https://11ty.dev). I like its simplicity and flexibility.

The copyrights of all characters in the drawings belong to their original copyright owners, this includes but not limited to Disney, Disney/Pixar, Marvel, and Lucasfilm.


## Contact

- Email: <zacky@marchbox.com>
- Twitter: [@marchbox](https://twitter.com/marchbox)


## Subscribe {@#subscribe}

- [All posts]({{'/feeds/all.xml'|url}}) (Atom)
- [Articles only]({{'/feeds/articles.xml'|url}}) (Atom)
- [Drawings only]({{'/feeds/drawings.xml'|url}}) (Atom)
