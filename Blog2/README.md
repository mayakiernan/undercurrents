# Blog2 — When Do We Build For The Storms Ahead

Open `../Blog2.html` or this folder’s `index.html` through the existing static host. All React code, county data, CSS and the slate image are bundled locally; no server or CDN is needed at runtime. Enter 73102 or 74103 to explore the roofing prototype.

To edit, change `src/`; run `npm install` then `npm run build` from this folder. Generated assets are checked in for static hosting.

# Oklahoma Roofing Resilience

Vinext / React prototype, styled to the supplied editorial reference.

Run `npm run dev`; build with `npm run build`. Enter **73102** (Oklahoma County) or **74103** (Tulsa County). Click counties to change the selection, and materials or Sources & ranking to inspect evidence.

## Data

`data/counties.json`: all 77 counties from Census 2024 1:500,000 cartographic boundaries (TIGER-derived). Display geometry is simplified in a longitude/latitude projection adjusted for Oklahoma. NOAA Storm Events county-coded Hail records for 2020–2024 are aggregated, with ≥1-inch severe and ≥2-inch large reports. Rank is total severe reports, not probability or size-normalized risk. Reports may represent the same storm. All years use the same period and filters. Five NOAA archives were retrieved 2026-11-10:
- 2020 c20260323
- 2021 c20260323
- 2022 c20260625
- 2023 c20260323
- 2024 c20260728

Wildfire uses the USDA Wildfire Risk to Communities April 15, 2026 workbook, Counties sheet, RISK_STATE_RANK and RISK_NATIONAL_RANK. Presentation classes are explicitly prototype percentile bands, not USDA classification names or home-level forecasts.

`data/zips.json`: 664 Oklahoma postal ZIPs with a 2020 Census ZCTA match, validated against GeoNames postal data. Selects the county with the largest intersecting land area, not the HUD USPS residential-address primary. Multi-county matches are marked. PO-box/new ZIPs without ZCTAs are not resolved; county clicks remain available. See in-app source links for original downloads.

`data/materials.ts`: product IDs, manufacturers, material categories, test scores, organization and protocol, date availability, installation limits, source URL/retrieval date, and explicitly unknown costs. Comparable scores transcribed from the IBHS 2026 scorecard. Four leading products are ranked by verified overall hail score; ties use identifier order. County hazard data supplies context, but does not justify manufacturing different material rankings. No inferred fire score, financial ROI, resale premium, or guaranteed insurance discount. Generic materials are explicitly not rated. Red dot is used only for Highlander AR's documented poor 3.5/10 dent/ridge subtest.

All sample visuals are locally rendered SVG material illustrations, not photographs of specific products. FSRI bench tests are distinguished from roof assembly fire certification. The program source states grant/insurance conditions and links to Oklahoma Insurance Department; eligibility is never promised.

## Reprocessing

The data processor is in `scripts/data/process_data.py`. It expects downloaded Census shapefiles (`census.zip`), NOAA `noaa2020.csv.gz` through `noaa2024.csv.gz`, USDA `wildfire.xlsx`, Census `zipcounty.txt`, and GeoNames `US.zip`. It requires openpyxl and pyshp. Run `python scripts/data/process_data.py --input /path/to/raw/downloads`; output defaults to this project’s data directory. Raw federal downloads are excluded from the deployment.
