# Undercurrents

React landing page with a full-bleed muted desert video, scroll-split title, italic subtitle and editorial project grid.

Run locally: python3 -m http.server 5174

Then open http://localhost:5174. React and Google Fonts need an internet connection.

## Shared header

Every page loads `assets/site-header.css` and `assets/site-header.js`, which inject the UC banner and the Home / Projects / Network nav. Edit links there once. Add `data-header="overlay"` to `<body>` to keep the header transparent over a `.scroll-stage` hero (home page only).

## Project filters

Topics and per-project tags live at the top of the `Projects` section in `app.js` (`topics` and `projects[].topics`).

## Blog 3 — The Annual Bet

`Blog3.html` is a scrolling map story (text on the left drives a sticky Leaflet map on the right, the same pattern as the `nuclear_ai_map` story). All text, map stops, places and risk zones live in `Blog3/story.js` (`CHAPTERS`, `PLACES`, `ZONES`); styling is in `Blog3/story.css`. Leaflet and the Esri base map load from the web.

## Blog 4 — Paid to Prepare

`Blog4.html` is a filterable map of state mitigation-discount laws (required / in the works, by hazard) and PACE financing status, with a "Both" overlap view, a detail panel and a searchable table. All state data and sources live in `Blog4/data.js` (`POLICY`, `SOURCES`) — edit that file to update the map, the table, the counts and the home-page tile map. State shapes are pre-projected SVG paths in `Blog4/states.js` (from us-atlas), so the map needs no map library or tile server. Logic is in `Blog4/map.js`, styling in `Blog4/map.css`.
