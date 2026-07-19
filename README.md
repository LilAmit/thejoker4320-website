# The Joker #4320, Team Website

Website for **The Joker #4320**, a FIRST® Robotics Competition team from Petah Tikva, Israel.
Theme: playing cards (Joker). Palette: red / black / white.

## Run it

Plain static site, no build step. Open the home page:

```bash
open index.html
```

Or run a local server (recommended):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Pages

The site is split into separate pages, all sharing the same header, footer and effects:

| File | Page |
|------|------|
| `index.html` | **Home**, hero + the 2026 robot + "Our Winning Hand" timeline |
| `about.html` | **About**, team story + flip-card values |
| `media.html` | **Media**, 2026 season photo gallery with a lightbox viewer |

The menu is **Home · About · Media**. The robot and achievements content lives
on the home page as sections you scroll to (`#robot` / `#achievements`).

## Structure

```
TheJoker/
├── index.html          # Home (hero + robot + winning-hand sections)
├── about.html          # About
├── media.html          # Media gallery
├── JokerPhotos/        # season photos used by the gallery
├── css/styles.css      # styling, theme colors, animations
├── js/
│   ├── layout.js       # SHARED header + footer (edit these once, here!)
│   ├── main.js         # interactions & scroll effects
│   └── gallery.js      # media page lightbox (click / arrows / close)
├── TheJokerLogo.jpg    # team logo
├── FIRSTLogo.png       # FIRST logo
├── AmalLogo.jpg        # school logo (footer)
└── assets/             # (spare) put future images here
```

## Important: how the shared header & footer work

To keep the **header and footer identical on every page**, they live in **one place**:
`js/layout.js`. Each page just has two empty placeholders that get filled in:

```html
<div id="site-header"></div>   <!-- becomes the navbar -->
<div id="site-footer"></div>   <!-- becomes the footer -->
```

👉 **To change the menu, logo, footer links, social icons, or email, edit `js/layout.js` only.**
The change then shows up on all four pages automatically.

The current page is told apart by the `data-page="…"` attribute on its `<body>` tag,
which is used to highlight the active menu item.

## Adding a new page

1. Copy any sub-page (e.g. `about.html`) to `newpage.html`.
2. Change `data-page="…"`, the `<title>`, and the `<main>` content.
3. Add a link to it in `js/layout.js` (both the nav and the footer).

## Editing tips

- **Colors** live at the top of `css/styles.css` under `:root` (`--red`, `--black`, `--white`).
- **Page content** is inside each page's `<main>`.
- **Menu / footer**, `js/layout.js`.

## Effects included

Card-deal hero (home) · floating suit particles · scroll-reveal animations ·
count-up stats · 3D tilt cards · flip cards · magnetic buttons · button ripples ·
animated timeline · sticky navbar · back-to-top.

All effects respect `prefers-reduced-motion` and adapt on touch devices.

> The Media page and "Our Sponsors" logo block are intentionally left out for now.
