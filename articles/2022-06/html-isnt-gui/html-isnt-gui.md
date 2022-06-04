---
title: HTML isn’t GUI
tags:
  - web-design
  - html
date: 2022-06-04
---

Many web developers take design mockups a bit too literally–thinking the rendered webpages should visually match the mockups. While it’s crucial to carry the visual design over to the coded the webpages, there’s so much more to our works than just making visual copies of mockups. We develop user interfaces that can be understood and interacted by different people with different tools.

^^^

The web democratized information access and publishing. As web developers, we should hold the responsibility to maintain this openness, to make our webpages as inclusive, understandable, and usable by as many people in the world as possible.

Webpages are often accessed by using graphical web browsers like Safari and Chrome. But there are also screen readers like Jaws and VoiceOver for visual impaired users, they interpret the webpages into audios instead of visuals. When developing a webpage, we shouldn’t just focus on its graphical user interface (GUI), but also the more abstract and content-focused user interface. Content-focused interface is output agnostic, users can consume the content visually, audibly, or even kinesthetically.

## Mockup to content structure

When we start to develop a website, we typically think about the site structure first: How many pages? What’s the content hierarchy? How does the navigation work? What content is shared across all pages? And so on. We should also do the same for individual webpages.

When I’m handed over a wireframe or a visual design mockup, the first thing I do is to figure out the content structure: What’s the title of the page (`<h1>`)? What are the sections and their headings (`<h2>`-`<h6>`)? What are the relationships between different sections? Where are the header and footer content boundaries? Where is the navigation? What’s the main content of the page? And so on.

After I get an overall grasp of the content structure, I’ll start writing HTML code without thinking too much about how to achieve the visual design from the mockup because that’s mainly CSS’s job at a later time. HTML is essential for all the different software that people use to understand the content on your webpages, it’s important to keep the HTML code content-focused: use semantic markups; minimize markups for decorative purposes; use proper `role` and `aria-*` attributes if necessary; add text-based content to visual assets like images and videos as alternative interface.

When you code HTML, don’t think about the mockups, keep a tree-shape structure that represents the content in your mind. Eventually, when you form a tree in your mind instinctually, you can repeat the process of mockup to content structure to HTML to CSS for each page section, multiple times for the same page.

## Separation of concerns

Many UI frameworks consider a webpage as a collection of UI elements, and to maximize their frameworks’ flexibility, many have components like `<Text>` and `<Spacer>` (but no `<table>` and GIF needed anymore, if you know what I mean):

```jsx
<Text variant="h1" weight="semibold">Heading 1</Text>
<Spacer vertical="12"></Spacer>
<Text variant="body2">
  Lorem ipsum <Text weight="bold">dolor sit</Text> amet.
</Text>
```

The above code usually outputs the following HTML code:

```html
<div class="type-h1 type-semibold">Heading 1</div>
<div class="spacer-v-12"></div>
<div class="type-body2">
  Lorem ipsum <span class="type-bold">dolor sit</span> amet.
</div>
```

The problem with this mindset is that you are only developing for visual users. The code could cause confusions for visual impaired users because `<div>`’s don’t have semantic meanings by default, a spacer doesn’t mean anything in the auditory context, and `<span class="type-bold">` doesn’t convey any importance of the marked content. This also mixes document structure with presentation, which could result in maintenance issues down the road.

When we transitioned away from table layouts, the main idea was separation of concerns: HTML handles the content structure, CSS handles the presentation, and JavaScript handles the behavior. The separation keeps HTML as a clean content-focused interface, and it makes many design changes easy to implement (by [modifying CSS only](https://csszengarden.com "CSS Zen Garden")).

## Conclusion

Web development is all about making the design accessible by everyone. Use your technical expertise to enhance the design mockups and make them work beyond the visual context. If you haven’t, I highly recommend read (or re-read) [A Dao of Web Design](https://alistapart.com/article/dao/).
