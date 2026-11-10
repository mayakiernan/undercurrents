# Undercurrents

React landing page with a full-bleed muted desert video, scroll-split title, italic subtitle and editorial project grid.

Run locally: python3 -m http.server 5174

Then open http://localhost:5174. React and Google Fonts need an internet connection.

## Shared header

Every page loads `assets/site-header.css` and `assets/site-header.js`, which inject the UC banner and the Home / Projects / Network nav. Edit links there once. Add `data-header="overlay"` to `<body>` to keep the header transparent over a `.scroll-stage` hero (home page only).

## Project filters

Topics and per-project tags live at the top of the `Projects` section in `app.js` (`topics` and `projects[].topics`).
