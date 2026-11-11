// =====================================================================================
//  BLOG 04 — PAID TO PREPARE. Filterable state map of mitigation-discount laws and PACE.
//  Data lives in ./data.js (POLICY). Shapes in ./states.js. No map library needed.
// =====================================================================================
import { STATES } from "./states.js?v=1";
import { NAMES, POLICY, SOURCES } from "./data.js?v=1";

const SVGNS = "http://www.w3.org/2000/svg";
const HAZARDS = { wind: "Wind & hurricane", hail: "Hail", wildfire: "Wildfire" };

// Each view: its categories (in legend order) and how a state maps to one.
const VIEWS = {
  discount: {
    title: "Mitigation discounts",
    cats: [
      { key: "required", label: "Discount required by law", fill: "var(--c-required)", ink: "#fff" },
      { key: "works", label: "In the works / partial", fill: "url(#hatch-works)", swatch: "var(--c-works)", ink: "#0b0b0b", hatch: true }
    ],
    classify(p, f) {
      const d = p.discount || {};
      const vals = f.hazard === "all" ? Object.values(d) : [d[f.hazard]].filter(Boolean);
      if (vals.includes("required")) return "required";
      if (vals.includes("works")) return "works";
      return null;
    }
  },
  pace: {
    title: "PACE financing",
    cats: [
      { key: "res", label: "Commercial + residential", fill: "var(--c-pace-3)", ink: "#fff" },
      { key: "active", label: "Commercial (C-PACE) active", fill: "var(--c-pace-2)", ink: "#fff" },
      { key: "enabled", label: "Law passed, not yet running", fill: "var(--c-pace-1)", ink: "#0b0b0b" }
    ],
    classify(p, f) {
      if (!p.pace) return null;
      if (f.resil && !p.resil) return null;
      return p.pace;
    }
  },
  overlap: {
    title: "Both",
    cats: [
      { key: "both", label: "Required discount + active PACE", fill: "var(--c-both)", ink: "#fff" },
      { key: "dOnly", label: "Required discount only", fill: "var(--c-required)", ink: "#fff" },
      { key: "pOnly", label: "Active PACE only", fill: "var(--c-pace-only)", ink: "#0b0b0b" }
    ],
    classify(p) {
      const d = Object.values(p.discount || {}).includes("required");
      const pc = p.pace === "res" || p.pace === "active";
      return d && pc ? "both" : d ? "dOnly" : pc ? "pOnly" : null;
    }
  }
};

// Tiny eastern states get a labelled tab off the coast so they can be read and clicked.
const CALLOUTS = { VT: 112, NH: 136, MA: 160, RI: 184, CT: 208, NJ: 236, DE: 260, MD: 284, DC: 308 };
const TAB_X = 948;
// Hand-placed label points where the centroid lands badly (Florida's is in the Panhandle bend).
const LABEL_AT = { FL: [797, 545], LA: [562, 474], MI: [669.5, 181] };

const state = { view: "discount", hazard: "all", resil: false, off: new Set(), selected: null, query: "" };

// ---------- helpers ----------
const $ = sel => document.querySelector(sel);
const el = (tag, attrs = {}, ...kids) => {
  const n = tag.startsWith("svg:") ? document.createElementNS(SVGNS, tag.slice(4)) : document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === "class") n.setAttribute("class", v);
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v === true ? "" : v);
  }
  for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(k));
  return n;
};
const fill = (node, ...kids) => node.replaceChildren(...kids.flat().filter(k => k != null && k !== false));
const view = () => VIEWS[state.view];
const catOf = ab => view().classify(POLICY[ab] || {}, state);
const visibleCat = ab => { const c = catOf(ab); return c && !state.off.has(c) ? c : null; };
const catInfo = key => view().cats.find(c => c.key === key);
const ABBRS = Object.keys(STATES).sort((a, b) => NAMES[a].localeCompare(NAMES[b]));

const DISCOUNT_LABEL = { required: "Required", works: "In the works" };
const PACE_LABEL = { res: "Commercial + residential PACE", active: "Commercial PACE active", enabled: "PACE law passed, no program yet" };

// ---------- map ----------
const svg = $("#us-map");
const shapes = {}, labels = {};

function buildMap() {
  const defs = el("svg:defs", {},
    el("svg:pattern", { id: "hatch-works", width: 7, height: 7, patternUnits: "userSpaceOnUse", patternTransform: "rotate(45)" },
      el("svg:rect", { width: 7, height: 7, fill: "var(--c-works)" }),
      el("svg:line", { x1: 0, y1: 0, x2: 0, y2: 7, stroke: "var(--c-required)", "stroke-width": 2, "stroke-opacity": .55 })));
  svg.append(defs);
  const gShapes = el("svg:g", { class: "shapes" });
  const gLines = el("svg:g", { class: "leaders", "aria-hidden": "true" });
  const gLabels = el("svg:g", { class: "labels", "aria-hidden": "true" });
  svg.append(gShapes, gLines, gLabels);

  for (const ab of ABBRS) {
    const { d, c } = STATES[ab];
    const path = el("svg:path", { d, class: "state", tabindex: 0, role: "button", "data-ab": ab });
    wire(path, ab);
    gShapes.append(path);
    shapes[ab] = [path];

    if (CALLOUTS[ab] != null) {
      const y = CALLOUTS[ab];
      gLines.append(el("svg:path", { d: `M${c[0]},${c[1]} L${TAB_X - 6},${y}`, class: "leader" }));
      const tab = el("svg:rect", { x: TAB_X, y: y - 9, width: 30, height: 18, rx: 2, class: "state tab", "data-ab": ab });
      wire(tab, ab, true);
      gShapes.append(tab);
      shapes[ab].push(tab);
      labels[ab] = el("svg:text", { x: TAB_X + 15, y: y + .5, class: "label" }, ab);
    } else {
      const [x, y] = LABEL_AT[ab] || [c[0], c[1]];
      labels[ab] = el("svg:text", { x, y, class: "label" }, ab);
    }
    gLabels.append(labels[ab]);
  }
}

function wire(node, ab, mouseOnly) {
  node.addEventListener("pointerenter", e => showTip(ab, e));
  node.addEventListener("pointermove", e => moveTip(e));
  node.addEventListener("pointerleave", hideTip);
  node.addEventListener("click", () => select(ab));
  if (!mouseOnly) {
    node.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(ab); } });
    node.addEventListener("focus", () => { const b = node.getBoundingClientRect(); showTip(ab, { clientX: b.left + b.width / 2, clientY: b.top + b.height / 2 }); });
    node.addEventListener("blur", hideTip);
  }
}

function paint() {
  for (const ab of ABBRS) {
    const cat = visibleCat(ab), info = cat && catInfo(cat);
    const fill = info ? info.fill : "var(--c-none)";
    for (const s of shapes[ab]) {
      s.style.fill = fill;
      s.classList.toggle("is-on", !!info);
      s.classList.toggle("is-selected", state.selected === ab);
    }
    labels[ab].style.fill = info ? info.ink : "var(--ink-muted)";
    const name = NAMES[ab];
    shapes[ab][0].setAttribute("aria-label", `${name}: ${info ? info.label : "no matching policy"}`);
    shapes[ab][0].setAttribute("aria-pressed", String(state.selected === ab));
  }
}

// ---------- tooltip ----------
const tip = $("#map-tip");
function showTip(ab, e) {
  const p = POLICY[ab] || {};
  const cat = catOf(ab), info = cat && catInfo(cat);
  fill(tip,
    el("b", {}, NAMES[ab]),
    el("span", { class: "tip-row" }, info ? el("i", { class: "sw" + (info.hatch ? " sw-hatch" : ""), style: `--sw:${info.swatch || info.fill}` }) : el("i", { class: "sw", style: "--sw:var(--c-none)" }), info ? info.label : "No matching policy"),
    state.view !== "pace" && p.discount ? el("span", { class: "tip-sub" }, Object.entries(p.discount).map(([h, s]) => `${HAZARDS[h]}: ${DISCOUNT_LABEL[s]}`).join(" · ")) : null,
    state.view !== "discount" ? el("span", { class: "tip-sub" }, p.pace ? PACE_LABEL[p.pace] : "No PACE law") : null,
    el("span", { class: "tip-hint" }, "Click for details")
  );
  tip.hidden = false;
  moveTip(e);
}
function moveTip(e) {
  const box = $(".map-frame").getBoundingClientRect();
  const w = tip.offsetWidth, h = tip.offsetHeight;
  let x = e.clientX - box.left + 14, y = e.clientY - box.top + 14;
  if (x + w > box.width - 8) x = e.clientX - box.left - w - 14;
  if (y + h > box.height - 8) y = e.clientY - box.top - h - 14;
  tip.style.transform = `translate(${Math.max(4, x)}px,${Math.max(4, y)}px)`;
}
function hideTip() { tip.hidden = true; }

// ---------- detail panel ----------
const panel = $("#detail");
function select(ab) {
  state.selected = state.selected === ab ? null : ab;
  paint(); renderDetail(); renderTable();
  if (state.selected && matchMedia("(max-width: 900px)").matches) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function badge(text, cls) { return el("span", { class: "badge " + cls }, text); }

function renderDetail() {
  const ab = state.selected;
  if (!ab) { panel.replaceChildren(...summary()); return; }
  const p = POLICY[ab] || {};
  const hz = Object.entries(p.discount || {});
  fill(panel,
    el("div", { class: "detail-head" },
      el("h3", {}, NAMES[ab]),
      el("button", { type: "button", class: "detail-close", "aria-label": "Close details", onclick: () => select(ab) }, "×")),
    el("section", { class: "detail-block" },
      el("h4", {}, "Mitigation discount"),
      hz.length ? el("div", { class: "badges" }, hz.map(([h, s]) => badge(`${HAZARDS[h]} · ${DISCOUNT_LABEL[s]}`, "b-" + s))) : el("p", { class: "muted" }, "No statewide requirement found. Some carriers discount voluntarily."),
      p.law ? el("p", {}, p.law) : null,
      p.grants ? el("p", {}, el("b", {}, "Grants: "), p.grants) : null,
      p.note ? el("p", {}, el("b", {}, "Next: "), p.note) : null),
    el("section", { class: "detail-block" },
      el("h4", {}, "PACE financing"),
      el("div", { class: "badges" }, badge(p.pace ? PACE_LABEL[p.pace] : "No PACE law", "b-pace-" + (p.pace || "none")), p.resil ? badge("Resilience upgrades eligible", "b-resil") : null),
      p.paceNote ? el("p", {}, p.paceNote) : null),
    p.check ? el("p", { class: "check" }, el("b", {}, "Sources disagree: "), p.check) : null
  );
}

function summary() {
  const all = ABBRS.map(ab => POLICY[ab] || {});
  const req = all.filter(p => Object.values(p.discount || {}).includes("required")).length;
  const works = all.filter(p => p.discount && !Object.values(p.discount).includes("required")).length;
  const pace = all.filter(p => p.pace === "res" || p.pace === "active").length;
  const both = ABBRS.filter(ab => VIEWS.overlap.classify(POLICY[ab] || {}) === "both").length;
  return [
    el("p", { class: "detail-kicker" }, "At a glance"),
    el("div", { class: "glance" },
      el("div", {}, el("strong", {}, req), el("span", {}, "states require a mitigation discount")),
      el("div", {}, el("strong", {}, works), el("span", {}, "more have one in the works")),
      el("div", {}, el("strong", {}, pace), el("span", {}, "states + DC run a PACE program")),
      el("div", {}, el("strong", {}, both), el("span", {}, "have both"))),
    el("p", { class: "muted" }, "Hover a state for a quick read. Click or tap one to see the law, the grant program and the PACE status here.")
  ];
}

// ---------- controls ----------
function renderControls() {
  document.querySelectorAll(".view-tab").forEach(b => b.setAttribute("aria-selected", String(b.dataset.view === state.view)));
  $("#hazard-group").hidden = state.view !== "discount";
  $("#resil-group").hidden = state.view !== "pace";
  document.querySelectorAll("#hazard-group button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.hazard === state.hazard)));
  $("#resil-toggle").setAttribute("aria-pressed", String(state.resil));

  const legend = $("#legend");
  legend.replaceChildren(...view().cats.map(c => {
    const n = ABBRS.filter(ab => catOf(ab) === c.key).length;
    const on = !state.off.has(c.key);
    return el("button", { type: "button", class: "legend-item", "aria-pressed": String(on), title: on ? "Click to hide" : "Click to show",
      onclick: () => { on ? state.off.add(c.key) : state.off.delete(c.key); update(); } },
      el("i", { class: "sw" + (c.hatch ? " sw-hatch" : ""), style: `--sw:${c.swatch || c.fill}` }), c.label, el("span", { class: "legend-count" }, n));
  }), el("span", { class: "legend-item legend-none" }, el("i", { class: "sw", style: "--sw:var(--c-none)" }), "None / filtered out"));

  const shown = ABBRS.filter(visibleCat).length;
  $("#map-count").textContent = `${shown} of 51 shown`;
  $("#map-title").textContent = view().title + (state.view === "discount" && state.hazard !== "all" ? ` · ${HAZARDS[state.hazard]}` : "") + (state.view === "pace" && state.resil ? " · resilience eligible" : "");
}

function update() { paint(); renderControls(); renderTable(); }

// ---------- table ----------
function renderTable() {
  const q = state.query.trim().toLowerCase();
  const onlyShown = $("#table-shown").checked;
  const rows = ABBRS.filter(ab => (!q || NAMES[ab].toLowerCase().includes(q) || ab.toLowerCase() === q) && (!onlyShown || visibleCat(ab)));
  const body = $("#policy-rows");
  body.replaceChildren(...rows.map(ab => {
    const p = POLICY[ab] || {};
    const hz = Object.entries(p.discount || {});
    return el("tr", { class: state.selected === ab ? "is-selected" : null },
      el("th", { scope: "row" }, el("button", { type: "button", class: "row-link", onclick: () => { select(ab); $(".map-frame").scrollIntoView({ behavior: "smooth", block: "center" }); } }, NAMES[ab])),
      el("td", {}, hz.length ? el("div", { class: "badges" }, hz.map(([h, s]) => badge(`${HAZARDS[h]} · ${DISCOUNT_LABEL[s]}`, "b-" + s))) : el("span", { class: "muted" }, "—")),
      el("td", {}, el("div", { class: "badges" }, badge(p.pace ? PACE_LABEL[p.pace] : "None", "b-pace-" + (p.pace || "none")), p.resil ? badge("Resilience", "b-resil") : null)),
      el("td", { class: "td-note" }, p.law || p.paceNote || ""));
  }));
  $("#table-count").textContent = `${rows.length} ${rows.length === 1 ? "state" : "states"}`;
}

// ---------- boot ----------
function boot() {
  buildMap();
  document.querySelectorAll(".view-tab").forEach(b => b.addEventListener("click", () => { state.view = b.dataset.view; state.off.clear(); update(); renderDetail(); }));
  document.querySelectorAll("#hazard-group button").forEach(b => b.addEventListener("click", () => { state.hazard = b.dataset.hazard; update(); }));
  $("#resil-toggle").addEventListener("click", () => { state.resil = !state.resil; update(); });
  $("#table-search").addEventListener("input", e => { state.query = e.target.value; renderTable(); });
  $("#table-shown").addEventListener("change", renderTable);
  document.addEventListener("keydown", e => { if (e.key === "Escape" && state.selected) select(state.selected); });

  // Deep link: Blog4.html#view=pace or #state=FL
  const hash = new URLSearchParams(location.hash.slice(1));
  if (VIEWS[hash.get("view")]) state.view = hash.get("view");
  if (STATES[(hash.get("state") || "").toUpperCase()]) state.selected = hash.get("state").toUpperCase();

  $("#source-list").replaceChildren(...SOURCES.map(([t, u]) => el("li", {}, el("a", { href: u, rel: "noopener" }, t))));
  update(); renderDetail();
}
boot();
