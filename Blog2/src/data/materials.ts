export type Material = {id:string;name:string;manufacturer:string|null;category:string;color:string;visual:string;test:{organization:string;standard:string;date:string|null;overall:number;dents:number;tears:number;granules:number;classification:string}|null;fire:string;wind:string;cost:null;incentive:string;source:string;retrieved:string;conditions:string;note:string};
const ibhs='https://ibhs.org/hail-impact-resistant-shingle-ratings/';
const rows:[string,string,string,number,number,number,number,string][]=[
 ['duration','TruDefinition Duration','Owens Corning',8,7.6,8.1,8.3,'#847d70'],
 ['sequoia','Grand Sequoia','GAF',8,8,8.8,7.2,'#514b43'],
 ['as2','Timberline AS II','GAF',7.9,6,9.6,8,'#8b7768'],
 ['legacy','Legacy Scotchgard Protector','Malarkey',7.8,8.6,7.6,7.3,'#5e6669'],
 ['northgate','NorthGate ClimateFlex','CertainTeed',7.7,4.5,8.9,9.7,'#7e7064'],
 ['belmont','Belmont IR','CertainTeed',7.7,8.2,9.6,5.3,'#606264'],
 ['flex','Duration FLEX','Owens Corning',7.5,6,7.9,8.5,'#aa9681'],
 ['hailguard','HailGuard','TAMKO',7.4,6.2,9.9,6,'#6b6358'],
 ['highlander','Highlander AR','Malarkey',7,3.5,9.1,8.3,'#786d5d'],
 ['storm','Duration STORM','Owens Corning',6.9,5.8,8.2,6.6,'#817d77'],
 ['landmark','Landmark','CertainTeed',6.9,5.8,8.2,6.7,'#68594e'],
 ['vista','Vista AR','Malarkey',6.8,7.1,8.6,4.6,'#5d6257'],
];
export const materials:Material[] = rows.map(([id,name,manufacturer,overall,dents,tears,granules,color])=>({id,name,manufacturer,category:'Asphalt shingle',color,visual:'shingle',test:{organization:'IBHS',standard:'IBHS Impact Resistance Test Protocol',date:null,overall,dents,tears,granules,classification:'Good'},fire:'Assembly listing required',wind:'Fastening & assembly specific',cost:null,incentive:'FORTIFIED eligibility requires the complete certified roof and Hail Supplement; a material rating alone does not qualify.',source:ibhs,retrieved:'2026-11-10',conditions:'2026 published scorecard. Individual test dates are not provided on the scorecard. Confirm the exact product, region, current listing, installation instructions and approved roof assembly before specifying.',note:'Independent hail testing; compare individual damage modes.'}));
for(const [id,name,color,visual] of [ ['standard','Standard asphalt','#605d59','shingle'],['standing','Standing-seam steel','#a1a7a5','metal'],['metal','Metal shingles','#8c9592','metal'],['concrete','Concrete tile','#9c9283','tile'],['clay','Clay tile','#ac6f4d','tile'],['synthetic','Synthetic slate','#565e65','slate'],['slate','Natural slate','#70747b','slate'],['slate-tile','Natural slate tile','#70747b','single-slate'],['cedar','Cedar shake','#b29a77','wood'] ]) materials.push({id,name,manufacturer:null,category:name,color,visual,test:null,fire:'Assembly listing required',wind:'Product & assembly specific',cost:null,incentive:'No product-specific eligibility verified. Ask a FORTIFIED evaluator and your insurer about the complete system.',source:id==='standard'?'https://materials.fsri.org/materialdetail/asphalt-shingle':ibhs,retrieved:'2026-11-10',conditions:'Generic comparison category, not a tested product. No laboratory hail score or certified fire classification is assigned. FSRI bench-scale fire properties do not establish a roof-assembly fire class.',note:'Insufficient product-specific performance data in this prototype.'});
export function rankMaterials(county:{hail:{count:number};fire:{statePercentile:number}}){
 // Only comparable, verified hail test scores enter the order. No financial or invented fire scores.
 return materials.filter(m=>m.test).map(m=>({material:m,score:m.test!.overall,reason:county.hail.count?`Good IBHS hail performance for reported county hail exposure.`:`Verified hail evidence; wildfire assembly review also required.`})).sort((a,b)=>b.score-a.score||a.material.id.localeCompare(b.material.id));
}
