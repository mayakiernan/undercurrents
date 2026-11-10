// =====================================================================================
//  BLOG 03 — THE ANNUAL BET. Scroll-driven map story (same pattern as the nuclear_ai_map
//  story: text on the left drives a sticky map on the right).
//  To change the story, edit CHAPTERS only:
//    • steps[].html            → the text for one scroll step (plain HTML)
//    • steps[].camera          → { center:[lat,lng], zoom } the map flies to
//    • steps[].places / zones  → ids from PLACES / ZONES below to show at that step
// =====================================================================================

const PLACES = {
  // Global hubs
  london: [51.513, -0.083, "London", "Lloyd’s & the London Market", "left"],
  zurich: [47.37, 8.54, "Zurich", "Swiss Re", "bottom"],
  munich: [48.14, 11.58, "Munich", "Munich Re"],
  hannover: [52.37, 9.73, "Hannover", "Hannover Re", "top"],
  paris: [48.86, 2.35, "Paris", "SCOR, AXA", "left"],
  europe: [49.6, 6.0, "London · Paris · Zurich · Munich", "Lloyd’s & Europe’s reinsurers"],
  usne: [41.2, -73.4, "New York · Hartford", "U.S. carriers & capital", "top"],
  bermuda: [32.29, -64.78, "Bermuda", "Reinsurance & catastrophe bonds"],
  newyork: [40.71, -74.01, "New York", "Carriers, brokers & capital", "left"],
  hartford: [41.76, -72.68, "Hartford", "“Insurance capital of the world”"],
  singapore: [1.29, 103.85, "Singapore", "Asia’s reinsurance hub"],
  tokyo: [35.68, 139.76, "Tokyo", "Japan’s large carriers", "left"],
  hongkong: [22.28, 114.16, "Hong Kong", "Gateway to China", "left"],
  // Southeast & Gulf
  miami: [25.76, -80.19, "Miami", ""],
  fortmyers: [26.64, -81.87, "Fort Myers", "Hurricane Ian, 2022"],
  neworleans: [29.95, -90.07, "New Orleans", "Katrina 2005 · Ida 2021"],
  lakecharles: [30.23, -93.22, "Lake Charles", "Hurricane Laura, 2020", "top"],
  houston: [29.76, -95.37, "Houston", "Harvey 2017 · Beryl 2024", "left"],
  asheville: [35.6, -82.55, "Asheville", "Helene inland flooding, 2024"],
  // West
  palisades: [34.05, -118.53, "Pacific Palisades", "Palisades Fire, Jan. 2025", "left"],
  altadena: [34.19, -118.13, "Altadena", "Eaton Fire, Jan. 2025"],
  paradise: [39.76, -121.62, "Paradise", "Camp Fire, 2018"],
  santarosa: [38.44, -122.71, "Santa Rosa", "Tubbs Fire, 2017"],
  // Plains / Hail Alley
  denver: [39.74, -104.99, "Denver", "May 2017 hailstorm"],
  dfw: [32.82, -97.0, "Dallas–Fort Worth", "Most hail claims in the U.S."],
  okc: [35.47, -97.52, "Oklahoma City", ""],
  tulsa: [36.15, -95.99, "Tulsa", "", "top"],
  omaha: [41.26, -95.93, "Omaha", ""],
  sanantonio: [29.42, -98.49, "San Antonio", ""],
  // Midwest & Dixie Alley
  cedarrapids: [41.98, -91.67, "Cedar Rapids", "Derecho, Aug. 2020"],
  mayfield: [36.74, -88.64, "Mayfield", "Tornado, Dec. 2021"],
  rollingfork: [32.91, -90.88, "Rolling Fork", "Tornado, Mar. 2023"],
  nashville: [36.16, -86.78, "Nashville", ""],
  // Northeast
  boston: [42.36, -71.06, "Boston", ""],
  seaside: [39.94, -74.07, "Jersey Shore", "Superstorm Sandy, 2012"],
  // Hail targets
  fightingjays: [29.45, -95.85, "Fighting Jays Solar (approx.)", "Hail, Mar. 2024"],
  midway: [31.2, -102.4, "Midway Solar (approx.)", "Hail, 2019"]
};

// Approximate zones of risk: [lat, lng, radius km, label]. Illustrative, not hazard models.
const ZONES = {
  hurricane: [28.6, -86.5, 720, "Hurricane coast"],
  wildfire: [37.2, -120.2, 430, "Wildfire"],
  hail: [37.2, -100.2, 640, "Hail Alley"],
  tornado: [34.8, -88.4, 430, "Dixie Alley"],
  northeast: [41.6, -72.8, 330, "Nor’easters & flood"],
  midwest: [41.5, -91.5, 360, "Derechos"]
};

const WORLD = { center: [30, 25], zoom: 2.15 };
const US = { center: [38.4, -96.5], zoom: 4.1 };

const CHAPTERS = [
  {
    id: "hubs", title: "Where insurance lives", tag: "The global market",
    steps: [
      {
        camera: WORLD, places: ["europe", "bermuda", "usne", "singapore", "tokyo", "hongkong"],
        html: `<p class="lead">Insurance is a simple idea at enormous scale. Many people pay a little, every year, so the few who have a very bad year can be paid a lot.</p>
        <p>Worldwide, people and businesses pay roughly <b>$7 trillion</b> a year in premiums, more than the economy of Japan. But that money doesn’t sit evenly across the map. The business of carrying risk clusters in a handful of cities.</p>
        <p>And insurers buy insurance too. That second layer is called <b>reinsurance</b>, and it is where a hurricane in Florida becomes a problem for a balance sheet in Zurich.</p>`
      },
      {
        camera: { center: [50, 5], zoom: 4.6 }, places: ["london", "zurich", "munich", "hannover", "paris"],
        html: `<p class="lead">London and continental Europe are the old engine room.</p>
        <p><b>Lloyd’s of London</b> started in a coffee house in the 1680s insuring ships. Today it is a marketplace where syndicates take on the strange and the huge: oil rigs, satellites, cyber attacks, and slices of American storm risk.</p>
        <p>A few hours away by train sit the world’s biggest reinsurers: <b>Munich Re</b>, <b>Swiss Re</b> in Zurich, <b>Hannover Re</b>, and <b>SCOR</b> in Paris. When a U.S. insurer wants protection against its worst year, these are the companies it calls.</p>`
      },
      {
        camera: { center: [37, -68], zoom: 4.4 }, places: ["bermuda", "newyork", "hartford"],
        html: `<p class="lead">Bermuda is a 21-square-mile island that insures a good part of America’s coastline.</p>
        <p>After Hurricane Andrew in 1992 wiped out several insurers, new money poured into Bermuda to start reinsurance companies. The island later became home base for <b>catastrophe bonds</b>, investments that pay a good return unless a specific disaster strikes, in which case investors lose their money and it goes to pay claims.</p>
        <p>Up the coast, <b>Hartford</b> earned the title “insurance capital of the world” in the 1800s, and <b>New York</b> holds the brokers and investors who move capital in and out of risk.</p>`
      },
      {
        camera: WORLD, places: ["europe", "bermuda", "usne", "singapore", "tokyo", "hongkong"],
        html: `<ul class="hubs">
          <li><b>London</b><span>Specialty risk, Lloyd’s</span></li>
          <li><b>Zurich · Munich</b><span>Global reinsurance</span></li>
          <li><b>Bermuda</b><span>Reinsurance, catastrophe bonds</span></li>
          <li><b>Hartford · New York</b><span>U.S. carriers & capital</span></li>
          <li><b>Singapore · Tokyo</b><span>Asia’s growing hubs</span></li>
        </ul>
        <p>Asia is the fastest-growing piece, with <b>Singapore</b> as its reinsurance hub and large carriers in <b>Tokyo</b>. But the biggest single market by far is the United States, which buys more than <b>40%</b> of the world’s insurance.</p>
        <p>So that is where we zoom in.</p>`
      }
    ]
  },
  {
    id: "us", title: "What America pays for", tag: "Drivers of loss",
    steps: [
      {
        camera: US, zones: ["hurricane", "wildfire", "hail", "tornado", "northeast"],
        html: `<p class="lead">An insurer’s “loss” is simply the money it pays out in claims. In the U.S., the biggest swings in those losses come from weather.</p>
        <p>Four kinds of disaster do most of the damage:</p>
        <ul class="targets">
          <li><span><b>Severe thunderstorms.</b> Hail, tornadoes and straight-line winds. Individually small, collectively the biggest bill.</span></li>
          <li><span><b>Hurricanes.</b> Rarer, but capable of the largest single-event losses in the country.</span></li>
          <li><span><b>Wildfire.</b> Once a rounding error, now a multi-billion-dollar line item in the West.</span></li>
          <li><span><b>Winter storms and flooding.</b> Frozen pipes, ice, and water. Most flood damage isn’t covered by a standard home policy at all.</span></li>
        </ul>`
      },
      {
        camera: US, zones: ["hurricane", "wildfire", "hail", "tornado", "northeast"],
        html: `<div class="stat"><strong>$107B</strong><span>Global insured natural-catastrophe losses in 2025, the sixth year in a row above $100 billion</span></div>
        <p>Here is the surprise. The headline disasters, the big earthquakes and Category 5 hurricanes, are not what has been driving the totals. Swiss Re found that <b>92%</b> of 2025’s insured losses came from wildfire, flooding and thunderstorms, the “secondary perils.”</p>
        <p>Thunderstorms alone produced around <b>$50 billion</b> of insured losses in 2025, most of it in the United States. That was the third year running above that mark.</p>
        <p>And it isn’t only weather. Building materials and labor cost more, lawsuits push claim payouts up, and more homes are being built in risky places. The same storm costs more each year it hits.</p>`
      }
    ]
  },
  {
    id: "annual", title: "A one-year promise", tag: "How the contract works",
    steps: [
      {
        camera: US, zones: ["hurricane", "wildfire", "hail", "tornado", "northeast"],
        html: `<p class="lead">Almost every home, car and business property policy in America is sold for <b>twelve months</b>.</p>
        <p>When the year is up, both sides can walk away. The insurer can raise the price, raise the deductible, cut out certain kinds of damage, or decline to renew. You can shop for someone else.</p>
        <p>Insurers renew their own protection on a calendar too. Reinsurance deals cluster on a few dates each year, and when those prices jump, the increase flows down to homeowners at their next renewal.</p>
        <div class="calendar" aria-label="Major reinsurance renewal dates">
          <div class="cal-row"><span class="on">Jan</span><span>Feb</span><span>Mar</span><span class="on">Apr</span><span>May</span><span class="on">Jun</span><span class="on">Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span></div>
          <ul class="cal-key">
            <li><b>Jan 1</b> Europe & most global deals</li>
            <li><b>Apr 1</b> Japan</li>
            <li><b>Jun 1</b> Florida, before hurricane season</li>
            <li><b>Jul 1</b> Australia, more U.S. programs</li>
          </ul>
        </div>`
      },
      {
        camera: US, zones: ["hurricane", "wildfire", "hail", "tornado", "northeast"],
        html: `<p class="lead">The catch: the things being insured last much longer than a year.</p>
        <div class="horizon" aria-label="One-year policy compared with the life of what it covers">
          <div class="one"><span>Policy</span><i style="--w:2;--n:1"></i></div>
          <div><span>Asphalt roof</span><i style="--w:40;--n:20"></i></div>
          <div><span>Solar array</span><i style="--w:60;--n:30"></i></div>
          <div><span>House</span><i style="--w:100;--n:50"></i></div>
        </div>
        <small>Each tick is one year, one renewal</small>
        <p>A 20-year roof is covered by twenty separate one-year bets. Annual pricing lets insurers react quickly to new risk, which keeps them solvent. But it also means nobody in the deal has a long-term reason to pay for a stronger roof today, because the payoff lands in years no one has signed for.</p>
        <p>That gap between a one-year contract and a decades-long building looks different depending on where you stand. So let’s go region by region.</p>`
      }
    ]
  },
  {
    id: "southeast", title: "Southeast & Gulf", tag: "Hurricane & flood",
    steps: [
      {
        camera: { center: [29.2, -87.5], zoom: 5.4 }, zones: ["hurricane"], places: ["miami", "fortmyers", "neworleans", "lakecharles", "houston", "asheville"],
        html: `<p class="lead">The Gulf and Atlantic coasts carry the country’s largest single-storm risk.</p>
        <p>A hurricane brings two kinds of damage: <b>wind</b>, which a home policy usually covers, and <b>storm surge and flooding</b>, which it usually doesn’t. That split decides who pays after almost every storm.</p>
        <p>Florida shows the strain. Private insurers pulled back so far that the state’s insurer of last resort, <b>Citizens</b>, swelled past 1.4 million policies in 2023 before reforms pushed many back to private companies. In Louisiana, about a dozen insurers failed after Hurricanes Laura and Ida.</p>
        <p>And the risk reaches inland: in 2024, Helene’s rains flooded mountain towns around <b>Asheville</b>, where very few homes carried flood insurance.</p>`
      }
    ]
  },
  {
    id: "west", title: "California & the West", tag: "Wildfire",
    steps: [
      {
        camera: { center: [36.4, -119.8], zoom: 5.7 }, zones: ["wildfire"], places: ["palisades", "altadena", "paradise", "santarosa"],
        html: `<p class="lead">In the West, the defining risk is fire.</p>
        <p>The Los Angeles fires of <b>January 2025</b>, in Pacific Palisades and Altadena, caused around <b>$40 billion</b> in insured losses, the most expensive wildfire event on record.</p>
        <p>Even before that, major carriers including State Farm and Allstate had stopped writing new home policies in California, saying they couldn’t charge enough for the risk. Many homeowners were pushed onto the state’s <b>FAIR Plan</b>, a bare-bones backstop meant for a small slice of the market.</p>
        <p>The West also holds the risk most people never insure: very few Californians carry earthquake coverage.</p>`
      }
    ]
  },
  {
    id: "plains", title: "The Plains", tag: "Hail Alley",
    steps: [
      {
        camera: { center: [36.4, -100.4], zoom: 5.1 }, zones: ["hail"], places: ["denver", "dfw", "okc", "tulsa", "omaha", "sanantonio"],
        html: `<p class="lead">From Texas up through Oklahoma, Kansas, Nebraska and Colorado’s Front Range runs <b>Hail Alley</b>.</p>
        <p>No single hailstorm looks like a catastrophe on the news. But this region gets hit again and again every spring and summer, and each storm can damage tens of thousands of roofs and cars in an afternoon.</p>
        <p>In <b>May 2017</b>, one storm over Denver caused about $2.3 billion in insured losses, then the costliest event in Colorado history. Texas files more hail claims than any other state, and booming suburbs around <b>Dallas–Fort Worth</b> mean every storm now has more roofs to hit.</p>
        <p>Our last post, <a href="./Blog2.html">Built In</a>, looks at what that means for a homeowner in Oklahoma choosing a new roof.</p>`
      }
    ]
  },
  {
    id: "midwest", title: "Midwest & Mid-South", tag: "Tornado & derecho",
    steps: [
      {
        camera: { center: [37.2, -89.4], zoom: 5.3 }, zones: ["tornado", "midwest"], places: ["cedarrapids", "mayfield", "rollingfork", "nashville"],
        html: `<p class="lead">Further east, the threat is wind.</p>
        <p>In August 2020, a <b>derecho</b>, a fast-moving line of storms with hurricane-force winds, crossed Iowa and flattened roofs, crops and grain bins around <b>Cedar Rapids</b> in a few hours.</p>
        <p>Tornado activity has been shifting from the classic Great Plains “Tornado Alley” toward the Mid-South, sometimes called <b>Dixie Alley</b>. That region has more people, more mobile homes, more trees and more storms at night, which makes each tornado more dangerous and more expensive. <b>Mayfield</b>, Kentucky (2021) and <b>Rolling Fork</b>, Mississippi (2023) were both hit after dark.</p>`
      }
    ]
  },
  {
    id: "northeast", title: "The Northeast", tag: "Coastal storm & water",
    steps: [
      {
        camera: { center: [41.4, -73.2], zoom: 6.4 }, zones: ["northeast"], places: ["newyork", "boston", "seaside", "hartford"],
        html: `<p class="lead">The Northeast has fewer disasters, but very expensive places for them to land.</p>
        <p><b>Superstorm Sandy</b> in 2012 pushed seawater into lower Manhattan and the Jersey Shore and remains one of the costliest storms in U.S. history. In 2021, the remains of Hurricane Ida dropped record rain on New York City and flooded basement apartments, damage most standard policies don’t cover.</p>
        <p>Here, the everyday losses are water: burst pipes in winter freezes, ice dams, and sewer backups in old housing that is costly to repair.</p>`
      }
    ]
  },
  {
    id: "hail", title: "The hail problem", tag: "Conclusion",
    steps: [
      {
        camera: US, zones: ["hail", "tornado", "midwest"], places: ["denver", "dfw"],
        html: `<p class="lead">Put the regions side by side and one storm keeps turning up: <b>hail</b>.</p>
        <div class="stat"><strong>80%</strong><span>Share of severe-thunderstorm insured losses that can come from hail in a given year</span></div>
        <p>Hailstorms are frequent, they hit wide areas, and they land on the most exposed part of almost everything we build: the top. A 2026 report from Cotality concluded hail now rivals major hurricanes in how much insured loss it can cause.</p>
        <p>Scientists are still working out how a warming climate changes hail. What isn’t in doubt is that we keep putting more roofs, cars and solar panels in its path.</p>`
      },
      {
        camera: { center: [32.9, -97.1], zoom: 8.2 }, places: ["dfw"],
        html: `<h3 class="sub"><span>01</span>Residential roofs</h3>
        <p>Roofs are the single biggest source of home insurance claims. Most American homes are topped with asphalt shingles, which hail can crack, bruise, or knock the protective granules off. A roof can look fine from the street and still need replacing.</p>
        <p>Insurers in hail country have responded with the tools a one-year contract allows: <b>deductibles</b> set at 1–2% of the home’s value for wind and hail, paying only the depreciated value of older roofs, and excluding “cosmetic” dents on metal roofs.</p>
        <p>Impact-resistant “Class 4” shingles can earn premium discounts in some states. The question from <a href="./Blog2.html">Built In</a> is who pays for the upgrade, and when.</p>`
      },
      {
        camera: { center: [32.9, -97.1], zoom: 8.2 }, places: ["dfw"],
        html: `<h3 class="sub"><span>02</span>Commercial buildings</h3>
        <p>Warehouses, schools, offices and stores tend to have big, flat roofs covered in a thin waterproof membrane. They are also crowded with <b>rooftop air-conditioning units</b>, skylights and vents.</p>
        <p>A single storm across a suburban business park can puncture dozens of roofs at once. The roof is only the start: water gets into inventory, equipment and ceilings, and the business may have to close. Commercial property insurers in the Plains have raised hail deductibles and in some cases capped hail coverage altogether.</p>`
      },
      {
        camera: { center: [30.6, -99.2], zoom: 5.9 }, places: ["fightingjays", "midway", "dfw"], zones: ["hail"],
        html: `<h3 class="sub"><span>03</span>Solar installations</h3>
        <p>Big solar farms are, in effect, square miles of glass laid flat under the sky, and many are being built in Texas, right inside Hail Alley.</p>
        <div class="stat"><strong>73%</strong><span>Share of solar insured losses caused by hail, from only about 6% of loss events (kWh Analytics)</span></div>
        <p>In March 2024, a hailstorm smashed thousands of panels at the <b>Fighting Jays</b> solar farm southwest of Houston. Operators now tilt panels steeply when hail approaches so stones glance off, and use thicker glass. Insurers are pricing hail on its own, with higher deductibles and lower limits.</p>`
      },
      {
        camera: US, zones: ["hurricane", "wildfire", "hail", "tornado", "northeast"],
        html: `<p class="lead">Every roof, every rooftop unit, every solar panel will outlive dozens of insurance renewals.</p>
        <p>The annual contract is good at one thing: letting insurers change course quickly when the risk changes. It is bad at rewarding anyone for building better in the first place.</p>
        <p>Hail is where that gap shows most clearly, because the fix is so concrete: a tougher shingle, a stronger membrane, a panel that can tilt out of the way. The open question is who pays for that toughness today, so that next year’s bet is a smaller one.</p>`
      }
    ]
  }
];

// =====================================================================================
//  ENGINE
// =====================================================================================
const pad = n => String(n).padStart(2, "0");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- text ----------
const root = document.getElementById("chapters");
const steps = [];
CHAPTERS.forEach((ch, ci) => {
  const sec = document.createElement("section");
  sec.className = "chapter"; sec.id = ch.id;
  sec.innerHTML = `<div class="ch-head"><div><h2>${ch.title}</h2><span class="ch-tag">${ch.tag}</span></div><span class="ch-num">${pad(ci + 1)}</span></div>`;
  ch.steps.forEach(s => {
    const el = document.createElement("div");
    el.className = "step"; el.innerHTML = s.html;
    el._data = { ...s, chapter: ci };
    sec.appendChild(el); steps.push(el);
  });
  root.appendChild(sec);
});

// ---------- map ----------
const L = window.L;
let map = null;
const placeLayer = L ? L.layerGroup() : null;
const zoneLayer = L ? L.layerGroup() : null;
if (L) {
  map = L.map("map", { zoomControl: false, scrollWheelZoom: false, zoomSnap: 0, minZoom: 2, maxZoom: 12, worldCopyJump: true })
    .setView(WORLD.center, WORLD.zoom);
  L.control.zoom({ position: "bottomright" }).addTo(map);
  const ESRI = "https://server.arcgisonline.com/ArcGIS/rest/services";
  L.tileLayer(`${ESRI}/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}`, { maxZoom: 16, attribution: "Tiles © Esri" }).addTo(map);
  zoneLayer.addTo(map); placeLayer.addTo(map);
} else {
  document.getElementById("map-fallback").hidden = false;
}

function drawZones(ids = []) {
  zoneLayer.clearLayers();
  ids.forEach(id => {
    const [lat, lng, km, label] = ZONES[id];
    L.circle([lat, lng], { radius: km * 1000, color: "#000", weight: 1, dashArray: "4 5", fillColor: "#000", fillOpacity: 0.07, interactive: false }).addTo(zoneLayer);
    L.tooltip({ permanent: true, direction: "center", className: "zone-label" }).setLatLng([lat, lng]).setContent(label).addTo(zoneLayer);
  });
}
function drawPlaces(ids = []) {
  placeLayer.clearLayers();
  ids.forEach(id => {
    const [lat, lng, name, note, dir = "right"] = PLACES[id];
    const offset = { right: [8, 0], left: [-8, 0], top: [0, -8], bottom: [0, 8] }[dir];
    L.circleMarker([lat, lng], { radius: 5, color: "#fff", weight: 1.5, fillColor: "#000", fillOpacity: 1 })
      .bindTooltip(`${name}${note ? `<em>${note}</em>` : ""}`, { permanent: true, direction: dir, offset, className: `place-label place-label--${dir}` })
      .addTo(placeLayer);
  });
}

const hudNum = document.getElementById("hud-num"), hudTitle = document.getElementById("hud-title");
let current = null;
function activate(el) {
  if (el === current) return;
  current?.classList.remove("is-active");
  current = el; el.classList.add("is-active");
  const s = el._data;
  hudNum.textContent = pad(s.chapter + 1);
  hudTitle.textContent = CHAPTERS[s.chapter].title;
  if (!map) return;
  drawZones(s.zones); drawPlaces(s.places);
  const { center, zoom } = s.camera;
  // On narrow screens the map is short, so pull back a little to keep the same area in view.
  const z = innerWidth <= 850 ? zoom - 0.6 : zoom;
  if (reduceMotion) map.setView(center, z, { animate: false });
  else map.flyTo(center, z, { duration: 1.4, easeLinearity: 0.2 });
}

// The step crossing the middle band of the viewport drives the map.
const io = new IntersectionObserver(entries => {
  entries.filter(e => e.isIntersecting).forEach(e => activate(e.target));
}, { rootMargin: "-45% 0px -45% 0px" });
steps.forEach(el => io.observe(el));
activate(steps[0]);
addEventListener("resize", () => map?.invalidateSize());
