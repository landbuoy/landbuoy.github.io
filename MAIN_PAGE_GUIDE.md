# Main Page Guide (`index.html`)

This document explains every structural and graphic element of the Land Buoy main page: what it is, which file defines it, and what it does when you interact with it.

**Files involved**

| File | Role |
| --- | --- |
| `index.html` | All markup: title bar, nav, modals |
| `style.css` | All styling (shared with the gallery pages) |
| `assets/js/scripts.js` | Behavior: modal open/close, dragging, random backgrounds, random colors, mobile touch |
| `assets/js/hausaufgabe.js` | Leftover color helper (see [Dead code](#dead-code-and-quirks)) |
| `assets/js/landbuoy.A1.patch.js`, `landBuoy.B1.patch.js` | Referenced inside the tape modals but **do not exist** in the repo (404) |

---

## 1. Page anatomy at a glance

```
┌──────────────────────────────────────────────────────────┐  .mainContainer (fixed, fills window,
│  (tiled grape.gif background + random color tint)         │   tiled grape.gif background)
│                                                           │
│  ┌────────────────────────────────────────────────────┐   │
│  │                    LAND BUOY                        │   │  .titleBar  (top: 20px, 30px tall,
│  └────────────────────────────────────────────────────┘   │   random tiled background)
│  ┌────────────────────────────────────────────────────┐   │
│  │ [Max Coker CV] [gif] [gif] [domino] [tape] [tape]   │   │  .nav       (top: 60px,
│  └────────────────────────────────────────────────────┘   │   random tiled background)
│                                                           │
│        ┌──────────────┐  ← draggable modals float          │
│        │ (X) Title     │    over everything, hidden        │
│        │  content      │    until opened                   │
│        └──────────────┘                                   │
└──────────────────────────────────────────────────────────┘
```

DOM order inside `<body>`:

1. `.mainContainer` (wraps everything)
   1. `.titleBar` → `.logoContainer` → `.logoContainer__inner` ("LAND BUOY")
   2. `<nav class="nav">` (six clickable items)
   3. `.modalContainer--resume` (Information modal)
   4. `.modalContainer--uploadIThought` (Bandcamp album A)
   5. `.modalContainer--uploadIIThoughts` (Bandcamp album B)
2. Script tags (`scripts.js`, `hausaufgabe.js`)

The page never scrolls. Everything is `position: fixed`, and the only scrolling is inside the Information modal.

---

## 2. `<head>`: libraries and metadata

| Element | Purpose |
| --- | --- |
| `viewport` meta (`user-scalable=no`, `viewport-fit=cover`) | Makes the page behave like an app on phones; no pinch zoom, fills notched screens |
| jQuery 1.11.0 + jQuery Migrate 1.2.1 (CDN) | DOM selection, `fadeIn/fadeOut`, event handling |
| jQuery UI 1.12.1 (CDN, with integrity hash) | Provides `.draggable()` for the modals |
| jQuery UI Touch Punch 0.2.3 (CDN) | Translates touch events into mouse events so the modals can be dragged on touch screens |
| `style.css` | All styling |
| Favicon `assets/img/favicon/icon 3.png` | Browser-tab icon |

Because jQuery and jQuery UI come from CDNs, the page needs an internet connection for modal dragging and fades to work.

---

## 3. Background: `.mainContainer`

* `position: fixed` with `top/left/right/bottom: 0`, so it always fills the browser window.
* `display: flex; align-items: center; justify-content: center` (centers anything flowing inside it; the title bar and nav are individually positioned, so this mostly matters for the modals' stacking context).
* **Graphic:** `assets/img/background/grape.gif` tiled (`background-repeat: repeat`) at `50px × 50px` (`background-size`). This produces the green, scale-like pattern.
* **Random tint:** on load, `scripts.js` picks a random hex color (`c1`) and sets it as `background-color`. It is only visible through transparent parts of the GIF, so the effect is subtle or invisible depending on the GIF.
* `image-rendering: smooth` is set but has little effect on a tiled background.

---

## 4. Title bar: `.titleBar`

* `position: fixed; top: 20px; width: 100%; height: 30px`, so it is a strip across the top.
* **Graphic:** defaults to `assets/img/background/wood.gif` tiled, but `scripts.js` overrides it on load with a random background (see [Random backgrounds](#8-random-backgrounds)).
* Flexbox centers the logo horizontally and vertically.

### Logo: `.logoContainer` / `.logoContainer__inner`

* Text "LAND BUOY".
* Style: 50px, bold italic, `MingLiU`/serif, color `#f44644` (red). The font is bigger than the 30px bar, so the text overflows the bar vertically; this is intentional and gives it a poster-like feel.
* `.logoContainer__inner` is a flex row with an 8px margin.
* `.logoContainer` has `transition: opacity 1s`, so it can be faded.
* The gallery pages use a variant (`.logoContainer--gallery`) that makes the title look like a nav button (lime border, black fill, 16px). The main page does not use this variant.

---

## 5. Navigation: `.nav`

* `position: fixed; top: 60px; width: 100%` (just below the title bar).
* **Graphic:** same random tiled background treatment as the title bar (default `wood.gif`).
* Items are `inline-block` with 8px margins, so they flow left to right and wrap if the screen is narrow.
* On screens narrower than 640px, the nav gets `left/right: 32px` and `display: flex; justify-content: space-between`.

The nav contains six items, left to right:

### 5.1 "Max Coker CV" button: `.button.button--resume`

* A `<div>` (not a link) 178 × 48 px. Lime text and 1px lime border on a black background, centered text, pointer cursor.
* **Action:** opens the Information modal (section 6.1).

### 5.2 Video feedback icon: `a.button--videogallery`

* An `<a>` linking to `videoFeedback.html` ("Explorations in Video Feedback").
* **Graphic:** `assets/img/project icons/mossComposites/marchComp3-6.gif`, an animated GIF shown 100 × 100 px (`object-fit: cover`).
* No hover animation.

### 5.3 TouchDesigner icon: `a.button--touchdesigner`

* An `<a>` linking to `touchdesigner.html` ("Video Compositing with TouchDesigner Systems").
* **Graphic:** `assets/img/gifs/grass.gif`, 100 × 100 px. Shares its CSS rule with 5.2.

### 5.4 Domino: `a.button--fortytwo`

* An `<a>` linking to `pages/fortytwo.html`, the 42 domino game.
* **Graphic:** `assets/img/dominoes/5-5.png`, shown at 200 × 100 px.
* **Hover effect:** on hover the image flips around its vertical axis (`rotate3d(0,1,0,180deg)`) over 0.5 seconds, like a domino turning over.

### 5.5 Tape icon 01: `.glyph.glyph--uploadIThought`

* A 96 × 96 px `.glyph` box (flex-centered) containing an image `assets/img/button/land buoy modals/tape icon 01.png` (class `glyphIcon`, `width: 100%`).
* **Hover effect:** flips 180° around the vertical axis (0.5s), same as the domino.
* **Action:** opens the "Upload I Thought" Bandcamp modal (section 6.2).

### 5.6 Tape icon 02: `.glyph.glyph--uploadIIThoughts`

* Same as 5.5 with `tape icon 02.png`.
* **Action:** opens the "Upload II Thoughts" Bandcamp modal (section 6.3).

> **Glyph vs. button:** a *button* (`.button`) is a text label, 178 × 48. A *glyph* (`.glyph`) is a 96 × 96 image icon. Image links (`--videogallery`, `--touchdesigner`, `--fortytwo`) have their own classes because they are links rather than modal triggers.

---

## 6. Modals

All modals share the `.modalContainer` base:

* `position: fixed`, `display: flex; flex-direction: column`, `min-width: 400px`, background `#eaeaea`.
* **`display: none` by default**; each variant sets this, and `fadeIn()`/`fadeOut()` toggles it.
* `cursor: move` on hover, since the whole modal is a drag handle.
* `touch-action: none` stops the browser's own touch scrolling from fighting the drag.
* **Glow:** a `box-shadow: 0px 0px 32px <color>`. The CSS default is tomato (`#ff6347`), but `scripts.js` replaces it on load with `c2`, the color-inverse of the page's random color, so the glow always contrasts.

Shared parts of a modal:

| Part | Class | Description |
| --- | --- | --- |
| Header bar | `.modalHeader` | Flex row, min-height 4rem, move cursor |
| Close button | `.aquaButton` (+ modifier) | Glossy round 1.5rem button with an "X", on the header's left |
| Title | `.modalTitle` | Centered, uppercase, 1.5rem bold |
| Body | `.modalInnerContainer` | Fills remaining height, `overflow-y: scroll`, padding `0 1rem 1rem` |

### Aqua buttons (close buttons)

Styled like the glossy Mac OS X "Aqua" buttons:

* Round (`border-radius: 50%`), soft drop shadow.
* A white gradient highlight on the upper half (`::after`) and a blurred white glow on the lower half (`::before`, `mix-blend-mode: overlay`) create the glass look.
* **Hover:** lifts 2px with a larger shadow. **Active:** pressed state.
* Each modal's button has its own modifier (`--resume`, `--uploadIThought`, `--uploadIIThoughts`). `scripts.js` sets each button's background to the random inverse color `c2`.
* Click and `touchstart` both close the modal (`preventDefault` + `stopPropagation` so a tap doesn't also start a drag).

### 6.1 Information modal: `.modalContainer--resume`

* Position: `top: 5%`, `bottom: 10%`, `right: 25%`, `width: 30%`, `height: 80vh`.
* **Background animation:** `animation: morph 180s infinite` slowly cycles the background through a palette (orange → periwinkle → purple → pink → green → aqua → blue → back) over three minutes.
* **Header:** aqua close button, title "Information".
* **Content (Courier New, blue text):** contact details (Instagram, email, site, CV link), an artist statement, then sections: Sound Design for Film, Music Recordings, Residencies, Performances, Exhibitions, Internships, Teaching, Work Experience. The text styling uses the `.c0`–`.c13` classes, which are leftovers from a Google Docs HTML export (`.c5` = bold blue heading, `.c2`/`.c7` = blue body, `.c3` = blue underlined link, `.c4` = link that inherits color).
* **Fade-out at the bottom:** `.modalContainer--resume .modalInnerContainer::after` places a 4rem gradient from transparent to the modal's gray at the bottom edge. This hints that the content scrolls on.
* Trailing `<br>` tags add empty space so the last line can scroll clear of that fade.

### 6.2 "Upload I Thought" modal: `.modalContainer--uploadIThought`

* Transparent background so the Bandcamp player floats directly over the page.
* Position: `top: 15%`, `right: 15%`, `width: 30%`, `height: 80vh` (offset from the next modal so both can be open without exactly overlapping).
* Contents: a header with the close button, and a Bandcamp embedded player `<iframe>` (350 × 853 px, white background/blue link colors, `transparent=true`) for the album at `landboy.bandcamp.com/album/upload-i-thought`. The `<a>` inside the iframe is the fallback text.
* The header also contains a `<script src="assets/js/landbuoy.A1.patch.js">`, which does not exist (404).
* `.modalInnerContainer iframe` is shifted up by `1rem` (`top: -1rem`) to tuck it under the header.

### 6.3 "Upload II Thoughts" modal: `.modalContainer--uploadIIThoughts`

* Same as 6.2 but `top: 20%`, `right: 10%`. It embeds `upload-ii-thoughts`. Its header references `landBuoy.B1.patch.js`, which also does not exist.

---

## 7. Interaction behavior (`scripts.js`)

All code runs inside `$(document).ready(...)`.

### Opening and closing

| Trigger | Handler | Result |
| --- | --- | --- |
| Click "Max Coker CV" | `.button--resume` | Information modal `fadeIn`s and is raised to the front |
| Click tape icon 01 / 02 | `.glyph--uploadIThought` / `--uploadIIThoughts` | That Bandcamp modal fades in and is raised |
| Click an aqua "X" | `setupAquaButton(...)` | That modal fades out |

The modals only ever **fade in** from their glyph/button (they do not toggle). Close them with the X.

### Dragging and stacking

* `$(".modalContainer").draggable()` (jQuery UI) lets you drag any modal anywhere by clicking it.
* **Click-to-front:** clicking a modal sets every *other* modal's `z-index` to 0 and its own to 9999. Opening a modal does the same. This is a poor-man's window manager.
* Aqua buttons use `z-index: 10001` so they stay clickable above everything.

### Random backgrounds

See [section 8](#8-random-backgrounds).

### Random colors

On load:

1. `randomColor()` builds a random 24-bit hex color, `c1`.
2. `invertColor(c1)` bit-flips it (`0xFFFFFF ^ color`) to get its opposite, `c2`.
3. `c1` becomes `.mainContainer`'s `background-color`.
4. `c2` becomes each modal's glow (`box-shadow`) and each aqua button's background.

Result: every visit has a different glow/button color that contrasts with the page tint.

### Mobile touch improvements ("hold to drag")

* On `touchstart` of a modal, a 400 ms timer starts. If the finger is still down, the modal enters **drag-ready** state: it gets `.drag-ready` (strong shadow, `z-index: 10000`), scales to 1.02×, and the phone vibrates for 50 ms (if supported).
* On `touchmove`, dragging only proceeds if drag-ready; moving earlier cancels the timer. This lets the user scroll inside a modal without accidentally moving it.
* `touchend`/`touchcancel` reset everything. `selectstart` is blocked so text doesn't highlight while dragging.
* A `<style>` tag is injected into `<head>` to define `.drag-ready` and some small-screen rules (min/max modal sizes, header press feedback).

---

## 8. Random backgrounds

`loadRandomGif(".titleBar")` and `loadRandomGif(".nav")` run on load:

1. Pick one of three random remote 50 × 50 px sources (two Lorem Picsum variants, one Unsplash Source URL).
2. Load it in a hidden `Image`. If it loads, it becomes the element's tiled `background-image`.
3. If it errors, or doesn't finish in **3 seconds**, pick a random local fallback from `assets/img/background/`: `grape.gif`, `pink.gif`, `red.gif`, `wood.gif`, `grid.gif`.

So with internet, the title bar and nav usually become tiled random photos. Offline, or when a source fails, they become one of the local patterned GIFs. The title bar and nav are chosen independently, so they often differ.

(Unsplash Source has been shut down, so that option always falls through to the local fallback.)

---

## 9. Responsive behavior (`@media (max-width: 640px)`)

* `.nav` is inset 32px on each side and uses flex `space-between`.
* `.modalContainer` becomes nearly full-screen: `top/left/right/bottom: 5%`, `width/height: 90%`, `min-width: auto`, and a default cursor instead of the move cursor.
* `.modalHeader` gets a 44px minimum height (a standard touch target) and a "⋮⋮⋮" drag-handle hint (`::after`).
* `.aquaButton` grows to at least 44 × 44 px and shrinks slightly when pressed.
* The header uses `touch-action: pan-x pan-y`, so it works as the drag area on phones.

---

## 10. Dead code and quirks

Worth knowing about when editing:

| Item | Notes |
| --- | --- |
| `assets/js/hausaufgabe.js` | Defines random colors and tries to style `.modalContainer--hausaufgabeInfo`, which no longer exists on the main page. It does nothing visible. The hausaufgabe feature now lives on `touchdesigner.html`. |
| `setOptimalTextColor(...)` in `scripts.js` | Meant to pick light or dark logo text based on the background brightness, but it only runs when the target is `.mainContainer`, and `loadRandomGif` is only called for `.titleBar` and `.nav`. So it never runs, and the logo stays `#f44644`. |
| `loadAnimatedGif(...)` | Alternative GIF-fetching system (Tenor/httpbin/placeholder), defined but its calls are commented out. |
| `.button--info`, `.button--home`, `.aquaButton--info`, `.aquaButton--moss` | Styles used by the gallery pages (or unused), not by the main page. |
| `.titleBar` / `.nav`: `left: 2; right: 2` | These lack units, so browsers ignore them; the width comes from `width: 100%`. |
| `landbuoy.A1.patch.js`, `landBuoy.B1.patch.js` | Referenced but missing, so the browser logs two 404s. Harmless, but they can be removed from `index.html`. |
| `libraries/` folder | Local copies of jQuery, jQuery UI and p5.js. `index.html` uses CDN copies instead, so these are unused by the main page. |
| Google-Docs classes (`.c0`…`.c13`) | Generated styling for the Information modal text. Editing text there is easiest by keeping the existing `<p class="c0"><span class="cN">` pattern. |

---

## 11. Cheat sheet: how to change things

| I want to... | Edit |
| --- | --- |
| Change the title text | `.logoContainer__inner` in `index.html` |
| Add a new nav icon that links to a page | Copy the `<a class="button--touchdesigner">` block in `index.html`; add its class to the shared rule in `style.css` |
| Add a new nav icon that opens a modal | Add a `.glyph` in `<nav>`, a `.modalContainer--yourName` block, matching CSS (`display: none`, position), and a click handler + aqua-button handler in `scripts.js` |
| Change icon size | `.button--videogallery img, .button--touchdesigner img` (100 × 100) or `.glyph` (96 × 96) in `style.css` |
| Change the tiled background | `background-image`/`background-size` in `.mainContainer` |
| Stop random title/nav backgrounds | Remove the two `loadRandomGif(...)` calls near the top of the "Random GIF scraping system" section of `scripts.js` |
| Change modal position or size | The `.modalContainer--…` rule in `style.css` (`top/right/width/height`) |
| Change modal glow or button color | The `c1`/`c2` section at the bottom of `scripts.js` |
| Update CV text | The `.modalContainer--resume` block in `index.html` |
