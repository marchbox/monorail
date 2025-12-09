---
title: Split keyboard
date: 2025-12-06
tags:
  - life
  - keyboard
---

I recently went on a rabbit hole of split ergonomic keyboards, from choosing my ideal build to customizing the layers and layouts to fit my own needs the best. I wanted to share my learning and experiences and if you are
looking to improve your typing experience, I hope this article could help.

^^^

## TL;DR

If you are here to check out someone’s setup, here they are:

* Keyboard: [Halcyon Ferris](https://splitkb.com/collections/keyboard-kits/products/halcyon-ferris) from splitkb.com
    * 36 keys: 3 rows, 5 columns, and 2 thumbs on each half
    * Left half module: [LED display](https://splitkb.com/collections/keyboard-parts/products/halcyon-tft-lcd-display-module)
    * Right half module: none
* Switches: [Nocturnal Ambient Silent Choc](https://lowprokb.ca/collections/switches/products/ambients-silent-choc-switches)
* Keycaps: [LDSA Low Profile Blank Keycaps](https://lowprokb.ca/collections/keycaps/products/ldsa-low-profile-blank-keycaps)
    * 28 regulars
    * 2 homings
    * 4 thumbs
* Tenting: I don’t have the packaging anymore so not sure the name, but I got them from [typeactive.xyz](https://typeractive.xyz/products/tenting-feet)
* Cables:
    * [Beats USB-C to C woven short cable](https://www.amazon.com/dp/B0F1W7B5R1): believe or not, it’s hard to find short, thin, good quality USB-C to C cables, this is the best I’ve found for now
    * [DuHeSin magnetic USB-C adapter](https://www.amazon.com/dp/B0BMX53FF9) to void wearing out the main USB port
* Current layout:
    * Layer 0: QWERTY
    * Layer 1: Colemak-DH
    * Layer 2: Numbers and symbols
    * Layer 3: Mouse and media
    * Layer 4: Navigation, functions, and shortcuts
    * Layer 5: keyboard settings
    * See the full map below
* Keymap software: [Vial](https://get.vial.today) (QMK)

## The hardware

Before I landed on my current split keyboard, I went through a few other ergonomic options:

* 2015–2021: [Microsoft Sculpt Ergonomic Keyboard](https://www.incase.com/collections/productivity-accessories/products/sculpt-ergonomic-keyboard)
* 2021–2024: Several Alice/Alisu style mechanical keyboard, including several from [Keychron](https://keychron.com)
* 2024–2025: My favorite Alice, [Qwertykeys Neo Ergo](https://www.incase.com/collections/productivity-accessories/products/sculpt-ergonomic-keyboard), with [Kailh Midnight Pro Silent switches](https://www.kailh.net/products/kailh-midnight-pro-silent-switch-set) and a set of [MT3 profile keycaps](https://drop.com/buy/drop-biip-mt3-extended-custom-keycap-set)

I started to look for a split keyboard because I didn’t like how much I had to move my hands to reach different keys and my trackball mouse (Logitech MX Ergo). I initially bought a 59-key Keyball, and immediately regretted that I didn’t opt in to something with fewer keys for even less hand movements. Which brought me to [Halcyon Ferris from Splitkb.com](https://splitkb.com/collections/keyboard-kits/products/halcyon-ferris). I’ve been very happy with the purchase, they have incredible documentation that’s thorough and well-written (or maybe that’s just my Stockholm syndrome as a web developer).

### Built-in pointer device

When I purchased the Ferris keyboard, I added the trackpad for the right hand side half, thinking that’d free my hand from moving to my trackball mouse back and forth. But my initial experience with it was disappointing for a few reasons:

* Splitkb’s firmware turned on the trackpad’s glide feature by default, meaning when you swipe the trackpad quickly, the cursor would keep moving for a bit. I found this behavior very unpredictable, I almost never needed it and it often got in the way of moving the cursor to where it’s supposed to be.
* The firmware also enables circular scroll by default, this seems to be a “clever” feature to have (by the manufacture) on the surface, but like the gliding feature, it’s confusing to use and often get in the way. The feature might be inspired by the famous iPod’s Click Wheel, since the trackpad is a circular shape, this feature enables users to swipe in a circular motion on the trackpad’s outer ring to scroll: when the swipe is initiated on the right half of the the outer ring, it activates vertical scrolling, when initiated on the left half, it activates horizontal scrolling. In practice, I the outer ring frequently prevents cursor movement when I accidentally touched the outer ring, and due to the small size of the trackpad, that happened a lot.
* The firmware of the Keyball 59 keyboard I initially got had the feature called “drag scroll”—holding down the trigger key while moving the pointing device (either a trackball or a trackpad), instead of moving the cursor, it’d scroll. Splitkb’s firmware doesn’t include this feature, but I managed to build a custom firmware that enabled this feature.
* Eventually, after enabling drag scroll, disabling gliding and circular scrolling, the trackpad felt much more usable. However, it is no where near the usability provided by the trackpad on MacBooks or my Logitech MX Ergo trackball, and because the position of the trackpad, it triggered mild pain on my right wrist. Ultimately I decided to remove it from my keyboard, it makes the keyboard take even less footprint, removed extra keymapping, and I even got more used to QMK’s built-in mouse emulator for mouse usage in between heavy typing sessions.
* I still hope there would be a Holy Grail solution for built-in pointer device, and I’m curious about embedded trackpoint between keys, like Thinkpad, which I used to enjoy a lot. But I’m OK give it up for now.

### Switches and keycaps

I was so surprised how much easier to type when I changed the switches to light switches that only require 20 grams to actuate. And with only 34 keys, I no longer need legend on my keycaps, everything can stay in my head, which brings up the topic of keymapping.

## Keymap

I think this is most fun part of using a custom mechanical keyboard, you customize the keymap to exactly what you need and like. Since I received my Ferris, I’ve been changing the keymap on a weekly basis, until my current revision. Here are my use cases on a high-level:

* Coding: I mostly write in HTML, CSS, and Javascript/Typescript, so I need many symbols to be available conveniently
* Documentation: I write documentations either in apps like Google Docs and Word, or Markdown files, and I do care about using curly quotation marks and em/en dashes, so again this is about making certain symbols available in convinience
* Helix: my main text editor for coding and Markdown, so I need to be able to easily hold keys like `Ctrl` and `Alt`
* Figma and other graphic design tools: I need to easily zoom and pan the canvas 
* Simplified Chinese: I do type in Simplified Chinese (with macOS’s built-in input method, which isn’t great but it requires no setup and I don’t type in Chinese often enough any more to look for alternatives), no special requirements for this use case, just need to make sure the keymap won’t get in the way

### Home row mod

This is a popular setup, the idea is that the 8 keys in your non-thumb fingers’ resting positions—this would be `A` to `F` and `J` to `;` on QWERTY—behave differently between tapping and holding, tapping triggers regular alphabet keys and holding triggers modifier keys, i.e. `Command`/`Windows` (in QMK, this is called `GUI`), `Shift`, `Alt`/`Option`, and `Ctrl`. Which means, for example, when you input an uppercase letter, the finger that holds down the modifier key doesn’t have to leave its resting position.

This behavior is mirrored on both halves of the keyboard, hence no matter which key you need to combine with modifiers, you can use the opposite hand to hold the modifier keys.

This does come with some downsides though:

* It delays the key input on tapping, because keyboard needs a bit time to figure out whether you want to tap or hold, you can change the settings to adjust it but it won’t eliminate it completely
* If you want to repeat the key, you have to tap then hold, this could be an issue for using editors like Vim and Helix as they leverage home row keys for navigation
* When you are typing in a flow state, it could trigger mistyping modifier keys since your fingers may move too fast

But for now I think the benefits outweigh the downsides, [Ben Vallack on YouTube has a different approach](https://youtu.be/8wZ8FRwOzhU?si=x70SxYTbH42nWD6J) that does’t use home row mods if you want some inspiration.

I use home row mods on both the Alphabet layer, number/symbol layer, and the navigation layer.

### Combos or not

Because there are 4 thumb keys, my thumbs/brain sometimes get confused and press the wrong one. So I wanted to only use thumb keys for space and layer toggling. I set up combos for keys like `Escape`, `Tab`, `Enter`, and `Backspace`. While it saves dedicated keys on a small size keyboard, it doesn’t feel good when having to press 2 keys at the same time, especially for frequently needed keys like `Backspace`, so I went back to dedicating the thumb keys for them.

I found I use `Backspace` a lot more than `Enter`, so originally I had `Backspace` on the primary thumb key, and holding it triggers the number/symbol layer, but when I’m in typing flow I mis trigger the `Backspace` too often and the cost is a lot higher than mis triggering `Enter`, so I switched them, even though that means less comfort for my thumb.

### Alphabet layer(s)

Not much to talk about this layers. For the QWERTY layer, it’s exactly the same as it is on a regular keyboard.

I have another alphabetical layer for Colemak-DH, I’m learning this layout now. I don’t hate QWERTY, but I’m curious if an alternative and deliberately designed layout would offer a more ergonomic typing experience. Some useful links if you are interested:

* Layout: https://colemakmods.github.io/mod-dh/
* Practice: https://www.keybr.com

### Number and symbol layer

This is the layer I’ve spent the most time on tweaking.

### Mouse and media layer

This layer is toggled on when I hold the left primary thumb key. Left hand is for scrolling and right hand is for moving the cursor. I put the `Command` key on the right side so that I can hold it and press mouse wheel keys to zoom in and out in Figma. It’s also useful to hold it, or both `Command` and `Shift` together and press `Mouse 1` to open a link in a new tab. The `Space` key on the left side can be used to pan the canvas in a non-Figma graphic app while either using a mouse or pressing the mouse moving keys on the right side.

I put the mouse acceleration keys at the left pinky positions to adjust cursor moving speed, for when I need to move for long distance (acceleration 0) or accurately (acceleration 1).

And since there are many empty keys left, I threw volume control keys and media playback keys on this layer.

### Navigation, function, and shortcut layer

### Keyboard setting layer

## Final thoughts
