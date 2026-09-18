# Campus Event Guide

## Project Description

This is a two-page website built for the (fictional) Ashbrook University
Office of Student Engagement. It helps students discover campus events by
listing upcoming activities on the home page and giving one event, the
International Food Festival, a full details page with a schedule,
accessibility information, and registration details. The intended
audience is current Ashbrook students browsing on both desktop and
mobile.

## Layout Decisions

**CSS Grid** is used in two places:
- `#events-grid` on `index.html` lays out the five upcoming event cards.
  The featured event (`#featured-event`) spans two columns, so the grid
  intentionally produces two different card widths side by side with the
  regular cards.
- `#event-layout` on `event.html` creates the two-column desktop layout
  for the main article and the sidebar (`2fr 1fr`), so the main content
  gets more horizontal space than the sidebar without either column
  needing a fixed pixel width.

Grid was the right tool for both of these because the layout is
two-dimensional: rows and columns both matter, and the featured card
needs to span multiple columns, which Flexbox cannot do on its own.

**Flexbox** is used in three places:
- The primary and footer navigation (`header nav ul`, `footer nav ul`)
  use `display: flex` with `gap` and `flex-wrap: wrap` so the nav links
  stay evenly spaced and wrap onto a second line on narrow screens
  instead of overflowing.
- `#site-header` uses Flexbox with `justify-content: space-between` to
  push the logo to one side and the nav to the other, while still
  wrapping and re-centering on small screens.
- `#related-events` on `event.html` uses Flexbox with `flex-wrap: wrap`
  and `gap` so the three related event cards sit in a row on wide
  screens and wrap onto new lines as the window narrows, without a fixed
  number of columns.

Flexbox fit these cases because each is a one-dimensional row of items
that just needs to stay aligned, spaced, and wrap gracefully - there's no
need for the two-dimensional row/column control that Grid provides.

## Responsive Design

Both pages include `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.

Two breakpoints are used, both defined in `css/styles.css`:

- **`max-width: 900px`** - The events grid drops from three columns to
  two, the featured card's image and text stack vertically instead of
  sitting side by side, the event detail page's `#event-layout` collapses
  to a single column, and the sidebar is pushed below the main content
  using `order: 2`.
- **`max-width: 600px`** - The events grid drops to a single column, the
  header navigation left-aligns instead of right-aligning, the hero text
  box stretches to fill the available width, and the main heading's font
  size is reduced so it doesn't overflow small screens.

Testing was done by resizing the browser window and using Chrome
DevTools' device toolbar to check common phone and tablet widths (about
375px, 600px, and 800px) on both pages.

## Semantic HTML

- **`<header>`** wraps the site logo and primary navigation at the top of
  both pages, separate from the rest of the page content.
- **`<nav>`** marks the primary navigation list on both pages and the
  footer navigation, so assistive technology can jump straight to the
  navigation links.
- **`<main>`** wraps the single block of unique page content on each
  page (there is exactly one per page), separate from the shared header
  and footer.
- **`<article>`** is used for each event card and for the main event
  write-up on `event.html`, since each is a self-contained piece of
  content that would make sense on its own.
- **`<aside>`** wraps the event sidebar on `event.html` because the
  date/time/location/admission summary is related to, but separate from,
  the main article content.
- **`<figure>`** and **`<figcaption>`** wrap the large event image on
  `event.html` so the image and its caption are grouped as one unit.
- **`<time>`** marks up every date and time shown to the user, with a
  machine-readable `datetime` attribute.
