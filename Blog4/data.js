// =====================================================================================
//  BLOG 04 — PAID TO PREPARE. State policy data for the map.
//  Research snapshot, November 2026. Edit this file to update the map; nothing else
//  needs to change.
//
//  discount  per-hazard status: { wind | hail | wildfire : "required" | "works" }
//              required = a statute or regulation requires insurers to give a premium
//                         discount (or rate reduction) for qualifying mitigation
//              works    = in the works / partial: a pending bill, a rule not yet in
//                         force, a regulator's directive, or a status sources dispute
//  law       one line on the policy itself
//  grants    a state grant program that pays for the upgrade, if any
//  pace      "res"     = commercial and residential PACE operating
//            "active"  = commercial PACE (C-PACE) program operating
//            "enabled" = enabling law passed, no program operating yet
//            omitted   = no PACE enabling law
//  resil     true when the state's PACE law names resilience / storm hardening as eligible
//  check     shown as "Sources disagree": say what is uncertain
// =====================================================================================

export const NAMES = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",CT:"Connecticut",DE:"Delaware",DC:"District of Columbia",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",ME:"Maine",MD:"Maryland",MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",MT:"Montana",NE:"Nebraska",NV:"Nevada",NH:"New Hampshire",NJ:"New Jersey",NM:"New Mexico",NY:"New York",NC:"North Carolina",ND:"North Dakota",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",UT:"Utah",VT:"Vermont",VA:"Virginia",WA:"Washington",WV:"West Virginia",WI:"Wisconsin",WY:"Wyoming"
};

export const POLICY = {
  // ---------- mitigation discounts: required ----------
  AL: { discount:{wind:"required"}, law:"Ala. Code §27-31D (2009): insurers must discount the wind portion of the premium for homes built or retrofitted to IBHS FORTIFIED.", grants:"Strengthen Alabama Homes: grants up to $10,000 for a FORTIFIED roof.", pace:"enabled", paceNote:"C-PACE law on the books; the ADECA-run program is still being built out.", resil:true },
  FL: { discount:{wind:"required"}, law:"Fla. Stat. §627.0629: insurers must offer discounts for wind-mitigation features documented in a wind-mitigation inspection (roof deck, roof-to-wall, shutters, roof shape).", grants:"My Safe Florida Home: matching grants for hurricane hardening.", note:"A 2026 bill (SB 1476) to widen premium reductions for mitigation died in committee.", pace:"res", paceNote:"One of the few states with residential PACE; wind-resistance work (roof deck, secondary water barrier, impact openings) is eligible.", resil:true },
  LA: { discount:{wind:"required"}, law:"La. R.S. 22:1483 requires an actuarially justified FORTIFIED discount on wind coverage; Act 533 (2025) and Regulation 136 set benchmark discounts insurers must apply by Jan. 1, 2027.", grants:"Louisiana Fortify Homes Program: roof grants, expanded in 2026.", note:"A 2026 Senate bill would go further and mandate a flat 20% discount.", pace:"enabled", paceNote:"PACE enabling law passed; no commercial program operating statewide.", check:"Older sources list Louisiana as having no PACE program at all." },
  MS: { discount:{wind:"required"}, law:"HB 1410 (2012): admitted insurers must provide discounts for homes meeting FORTIFIED criteria, reported at up to 55% off the wind premium.", grants:"State-run FORTIFIED roof grants on the Gulf Coast.", pace:null },
  SC: { discount:{wind:"required"}, law:"Omnibus Coastal Property Insurance Reform Act (2007), S.C. Code §38-75-737: insurers must file and offer discounts for wind-mitigation measures.", grants:"SC Safe Home grants, plus a state income-tax credit for retrofits.", pace:null, check:"Some broker guides call South Carolina discounts voluntary; the statute requires insurers to file them." },
  NC: { discount:{wind:"required"}, law:"FORTIFIED discount levels are built into the NC Rate Bureau's homeowners rates, so they apply across the market.", grants:"NC Insurance Underwriting Association roof grants in coastal counties.", pace:"active", paceNote:"Statewide C-PACER program launched in 2025; resilience upgrades are eligible.", resil:true, check:"The NAIC counts North Carolina as setting discount levels; some broker guides say the discount is not mandated by statute." },
  OK: { discount:{wind:"required",hail:"required"}, law:"36 O.S. §§961–962 (HB 1720, in force Apr. 2018): insurers must offer a premium discount or rate reduction for homes built or retrofitted to FORTIFIED High Wind & Hail.", grants:"Strengthen Oklahoma Homes Act (HB 3089, 2024): grants up to $10,000.", pace:"enabled", paceNote:"Enabling law, little or no deal flow." },
  MN: { discount:{hail:"required",wind:"required"}, law:"Minn. Stat. §65A.298: insurers must give a discount or rate reduction for FORTIFIED homes with the hail supplement. Bulletin 2026-1 sets benchmarks of 35% to 40% of the wind/hail premium.", grants:"Strengthen Minnesota Homes (§65A.299) roof grants.", pace:"active", paceNote:"Active C-PACE (Minnesota PACE / Saint Paul Port Authority)." },
  KY: { discount:{wind:"required",hail:"required"}, law:"HB 256 (2024), the Strengthen Kentucky Homes Act: insurers must give a premium discount for FORTIFIED homes, at levels the commissioner can set.", grants:"Strengthen Kentucky Homes: $5M fund, grants up to $10,000, launched March 2026.", pace:"active", paceNote:"Active C-PACE." },
  CA: { discount:{wildfire:"required"}, law:"Safer from Wildfires regulation (2022): insurers must give discounts for home hardening and community mitigation. AB 1 (2025) makes the department keep the list current.", grants:"Wildfire Mitigation Program retrofit grants in pilot communities.", pace:"res", paceNote:"Largest residential PACE market; seismic and wildfire hardening are eligible.", resil:true },
  CO: { discount:{wildfire:"required",hail:"works"}, law:"HB25-1182: insurers must show policyholders their wildfire risk score and either credit mitigation in their model or give a discount for it.", note:"Hail is next: a 2026 bill creating a home-resilience enterprise cleared the Senate and would make insurers report resilient-roof discounts.", pace:"active", paceNote:"Active statewide C-PACE; resilience improvements are eligible.", resil:true },

  // ---------- mitigation discounts: in the works / partial ----------
  TX: { discount:{wind:"works",hail:"works"}, law:"TDI Commissioner's Bulletin B-0008-26 (Sept. 2026) urges insurers to file meaningful FORTIFIED discounts after the governor directed TDI to act. It encourages; it doesn't require.", note:"TDI is recommending statute changes for the 2027 legislative session.", pace:"active", paceNote:"Very active C-PACE (PACE in a Box); resiliency and water conservation are eligible.", resil:true },
  GA: { discount:{wind:"works"}, law:"No statute-level mandate confirmed. Georgia legislators co-sponsored NCOIL's Strengthen Homes model act (2024).", pace:"active", paceNote:"HB 206 C-PACE, expanded statewide in 2024; resiliency is eligible.", resil:true, check:"An NAIC summary lists Georgia among states that set FORTIFIED discount levels; broker guides describe Georgia discounts as voluntary." },
  OR: { discount:{wildfire:"works"}, law:"A bill from Sen. Jeff Golden would require insurers that don't use catastrophe models to give a discount or other incentive for IBHS-standard home hardening.", pace:"active", paceNote:"Active C-PACE." },
  NY: { discount:{wind:"works"}, law:"Assembly bill A5874 would create a Strengthen Homes program with remodeling grants and insurance discounts.", pace:"active", paceNote:"Active C-PACE (NYC Accelerator and Energy Improvement Corporation)." },
  WV: { discount:{wind:"works",hail:"works"}, law:"A sponsor of NCOIL's Strengthen Homes model has described a West Virginia bill based on it; enactment is unconfirmed.", pace:null, check:"Enactment of the West Virginia bill could not be confirmed." },

  // ---------- PACE only ----------
  AK: { pace:"active", paceNote:"C-PACE operating (Anchorage)." },
  AR: { pace:"active", paceNote:"Active C-PACE through local improvement districts." },
  CT: { pace:"active", paceNote:"Connecticut Green Bank C-PACE; resiliency is eligible.", resil:true },
  DE: { pace:"active", paceNote:"Active C-PACE." },
  DC: { pace:"active", paceNote:"DC PACE, one of the oldest commercial programs." },
  HI: { pace:"active", paceNote:"C-PACE program launched in 2025." },
  ID: { pace:"active", paceNote:"H 624 C-PACE, first program launched in 2025; resiliency is eligible.", resil:true },
  IL: { pace:"active", paceNote:"Active C-PACE (Chicago, Cook County and others)." },
  MD: { pace:"active", paceNote:"Active C-PACE (MD-PACE); resiliency is eligible.", resil:true },
  MA: { pace:"active", paceNote:"PACE Massachusetts, run by MassDevelopment." },
  MI: { pace:"active", paceNote:"Lean & Green Michigan C-PACE." },
  MO: { pace:"active", paceNote:"Active C-PACE. Residential PACE closed to new projects in 2024 (SB 736).", check:"One 2026 guide still lists Missouri residential PACE as open." },
  MT: { pace:"active", paceNote:"C-PACE law (2021) and active program." },
  NE: { pace:"active", paceNote:"Active C-PACE (Omaha, Lincoln and others)." },
  NV: { pace:"active", paceNote:"Active C-PACE." },
  NH: { pace:"active", paceNote:"Active C-PACE." },
  NJ: { pace:"active", paceNote:"C-PACER program launched in 2025; resilience is eligible.", resil:true },
  NM: { pace:"active", paceNote:"Active C-PACE." },
  OH: { pace:"active", paceNote:"Active C-PACE through energy special improvement districts." },
  PA: { pace:"active", paceNote:"Active C-PACE (Philadelphia, Allegheny and others)." },
  RI: { pace:"active", paceNote:"Rhode Island Infrastructure Bank C-PACE." },
  TN: { pace:"active", paceNote:"TENNESSEE PACE (C-PACER) puts resiliency front and center; local opt-in varies.", resil:true },
  UT: { pace:"active", paceNote:"Active C-PACE." },
  VA: { pace:"active", paceNote:"Active C-PACE; flood and resiliency improvements are eligible.", resil:true },
  WA: { pace:"active", paceNote:"Active C-PACER (King County and others)." },
  WI: { pace:"active", paceNote:"PACE Wisconsin." },
  ME: { pace:"enabled", paceNote:"C-PACE law passed; program still ramping up." },
  ND: { pace:"enabled", paceNote:"Enabling law, no operating program." },
  VT: { pace:"enabled", paceNote:"C-PACE enabling law passed; no funding available yet." },

  // ---------- neither ----------
  AZ: { pace:null }, IN: { pace:null }, IA: { pace:null }, KS: { pace:null }, SD: { pace:null }, WY: { pace:null }
};

export const SOURCES = [
  ["NPR / Gulf States Newsroom, “How homeowners are saving on insurance by upgrading their houses against disasters” (June 2025)", "https://www.npr.org/2025/06/11/nx-s1-5340712/climate-home-insurance-discount-alabama-ca"],
  ["Environmental Law Institute, “States Lean Into Fortified Housing Incentives as Insurers Curtail Coverage”", "https://www.eli.org/environmental-forum-column/states-lean-fortified-housing-incentives-insurers-curtail-coverage"],
  ["IBHS FORTIFIED, financial incentives by state", "https://fortifiedhome.org/incentives/"],
  ["NAIC, resiliency and mitigation funding summary", "https://content.naic.org/sites/default/files/inline-files/Resiliency%20and%20mitigation%20funding.pdf"],
  ["Louisiana Department of Insurance, Act 533 FORTIFIED discount report (2025)", "https://ldi.la.gov/docs/default-source/documents/propertycasualty/act-533-fortified-discount-report-2025.pdf"],
  ["Minnesota Commerce, Administrative Bulletin 2026-1 (FORTIFIED discount benchmarks)", "https://mn.gov/commerce-stat/insurance/industry/bulletins/2026/administrative_bulletin_2026.1.pdf"],
  ["Minn. Stat. §65A.298", "https://www.revisor.mn.gov/statutes/cite/65A.298"],
  ["Kentucky HB 256 (2024), Strengthen Kentucky Homes Act", "https://apps.legislature.ky.gov/RECORD/24rs/hb256.html"],
  ["Insurance Journal, “Kentucky Launches $5 Million Roof Grant Program” (Mar. 2026)", "https://www.insurancejournal.com/news/southeast/2026/03/13/861863.htm"],
  ["Oklahoma Statutes, 36 O.S. §962", "https://law.justia.com/codes/oklahoma/2018/title-36/section-36-962/"],
  ["California Department of Insurance, Safer from Wildfires FAQ", "https://www.insurance.ca.gov/01-consumers/105-type/95-guides/03-res/upload/FAQ-Safer-from-Wildfire-Regulation.pdf"],
  ["Kiowa County Press, “New Colorado law requires insurers to credit home wildfire mitigation”", "https://kiowacountypress.net/content/new-colorado-law-requires-insurers-credit-home-wildfire-mitigation"],
  ["Colorado Senate Democrats, property-insurance resilience bill clears Senate (2026)", "https://www.senatedems.co/newsroom/bill-to-make-property-insurance-more-affordable-clears-senate"],
  ["Central Oregon Daily, “Oregon proposal ties insurance discounts to fire-safe homes”", "https://www.centraloregondaily.com/news/regional/oregon-wildfire-prevention-insurance-discounts/article_e167d54c-b534-4a17-b4dc-fd1540d23b39.html"],
  ["The Florida Senate, SB 1476 (2026)", "https://www.flsenate.gov/Session/Bill/2026/1476"],
  ["New York Assembly, A5874", "https://nyassembly.gov/leg/?Memo=Y&Summary=Y&bn=5874"],
  ["NCOIL, Strengthen Homes Program Model Act (adopted Nov. 2024)", "https://ncoil.org/news/ncoil-adopts-five-new-model-laws-at-annual-meeting-in-san-antonio/"],
  ["PACENation, PACE programs by state", "https://www.pacenation.org/pace-programs/"],
  ["CRE Daily, “C-PACE Lending Surges as State Programs Expand Nationwide” (2026)", "https://www.credaily.com/briefs/c-pace-lending-surges-as-state-programs-expand-nationwide/"],
  ["Commercial Observer, “C-PACE Lending Expanding in Size, Scope” (June 2026)", "https://commercialobserver.com/2026/06/c-pace-lending-expansion-2026/"],
  ["Climate Policy Dashboard, Property Assessed Clean Energy", "https://www.climatepolicydashboard.org/policies/buildings-efficiency/pace"],
  ["Alabama ADECA, C-PACE considerations", "https://adeca.alabama.gov/wp-content/uploads/Alabama-C-PACE-Considerations-Final.pdf"],
  ["State outlines: us-atlas 3.0.1, from U.S. Census Bureau cartographic boundaries", "https://github.com/topojson/us-atlas"]
];
