import React, {useEffect,useState} from 'https://esm.sh/react@19.0.0';
import {createRoot} from 'https://esm.sh/react-dom@19.0.0/client';
import {POLICY} from './Blog4/data.js?v=1';
const h=React.createElement;
const phrase='of the future to come';
function Handwriting(){return h('span',{'aria-label':phrase},...Array.from(phrase).map((letter,i)=>h('span',{key:i,className:'hand-letter','aria-hidden':true,style:{'--i':i}},letter===' '?'\u00a0':letter)));}

// Blog 04 card: a tile-grid U.S. map colored from Blog4/data.js ([row, col] per state).
const TILES={AK:[0,0],ME:[0,10],VT:[1,9],NH:[1,10],WA:[2,0],ID:[2,1],MT:[2,2],ND:[2,3],MN:[2,4],IL:[2,5],WI:[2,6],MI:[2,7],NY:[2,8],RI:[2,9],MA:[2,10],OR:[3,0],NV:[3,1],WY:[3,2],SD:[3,3],IA:[3,4],IN:[3,5],OH:[3,6],PA:[3,7],NJ:[3,8],CT:[3,9],CA:[4,0],UT:[4,1],CO:[4,2],NE:[4,3],MO:[4,4],KY:[4,5],WV:[4,6],VA:[4,7],MD:[4,8],DE:[4,9],AZ:[5,1],NM:[5,2],KS:[5,3],AR:[5,4],TN:[5,5],NC:[5,6],SC:[5,7],DC:[5,8],OK:[6,3],LA:[6,4],MS:[6,5],AL:[6,6],GA:[6,7],HI:[7,0],TX:[7,3],FL:[7,8]};
function tileFill(ab){const p=POLICY[ab]||{},d=Object.values(p.discount||{}).includes('required'),pc=p.pace==='res'||p.pace==='active';return d&&pc?'#eb6834':d?'#2a78d6':pc?'#1baf7a':'#ecebe6'}
function TileMap(){return h('svg',{className:'tile-map',viewBox:'0 0 264 192','aria-hidden':true},...Object.entries(TILES).map(([ab,[r,c]])=>h('g',{key:ab},h('rect',{x:c*24+1,y:r*24+1,width:22,height:22,rx:2,fill:tileFill(ab)}),h('text',{x:c*24+12,y:r*24+12.5,fill:tileFill(ab)==='#ecebe6'?'#8a8984':'#fff',fontSize:7,fontWeight:600,textAnchor:'middle',dominantBaseline:'central',fontFamily:'Inter,Arial,sans-serif'},ab))))}

// Project filters. Add a topic here, then list its key in each project's `topics`.
const topics=[
 {key:'all',label:'All'},
 {key:'agriculture',label:'Agriculture'},
 {key:'housing',label:'Housing'},
 {key:'insurance',label:'Insurance'},
 {key:'policy',label:'Policy'}
];
const projects=[
 {id:'01',topics:['agriculture','insurance'],render:()=>h('article',{className:'project project-grown'},h('div',{className:'project-heading'},h('h3',null,'GROWN',h('br'),'TO DIE'),h('span',{className:'project-number'},'01')),h('img',{className:'cotton-image',src:'./cotton.png',alt:'Black line drawing of a cotton stem'}),h('p',null,'If you were told there was a 4% chance of survival you would be worried. But in some Texas counties that’s becoming the norm for entire fields of crops. An analysis of Texas cotton and an insurance system unincentivizing adaptation.'),h('small',null,'Research / Texas cotton'))},
 {id:'02',topics:['housing','insurance'],render:()=>h('a',{className:'project project-two project-built-in',href:'./Blog2.html#blog-top','aria-label':'Blog 2: Built In — resilience and material choice'},h('div',{className:'project-heading'},h('p',null,'Can you make resilience part of the renovation, not the reason for it? And if so, who is the stakeholder you need to get on board?'),h('span',{className:'project-number'},'02')),h('img',{className:'roof-card-image',src:'./Blog2/assets/slate-roof-hero.webp',alt:'Slate roofing tiles with loose overlapping slate samples',loading:'lazy'}),h('h3',null,'BUILT IN'),h('small',null,'RESILIENCE / MATERIAL CHOICE'))},
 {id:'03',topics:['insurance'],render:()=>h('a',{className:'project project-three project-annual-bet',href:'./Blog3.html#blog-top','aria-label':'Blog 3: The Annual Bet — insurance, loss and hail'},h('h3',null,'THE ANNUAL',h('br'),'BET'),h('svg',{className:'hail-graphic',viewBox:'0 0 240 150','aria-hidden':true},...Array.from({length:60},(_,i)=>{const c=i%12,r=Math.floor(i/12),k=Math.abs(Math.sin(i*12.9898)*43758.5453)%1;return h('circle',{key:i,cx:10+c*20,cy:15+r*30,r:1.5+k*k*7,fill:k>.82?'#000':'none',stroke:'#000',strokeWidth:.8})})),h('div',{className:'project-heading'},h('p',null,'Insurance is sold one year at a time; roofs, warehouses and solar farms last decades. A plain-language map of where risk is carried, what drives U.S. losses, and why hail keeps breaking the bank.'),h('span',{className:'project-number'},'03')),h('small',null,'Insurance / Loss / Hail'))},
 {id:'04',topics:['housing','insurance','policy'],render:()=>h('a',{className:'project project-four project-paid',href:'./Blog4.html#blog-top','aria-label':'Blog 4: Paid to Prepare — a map of mitigation-discount laws and PACE financing'},h('div',{className:'project-heading'},h('span',{className:'project-number'},'04'),h('p',null,'Which states make insurers discount your premium for a stronger roof, which are about to, and where PACE financing pays for the upgrade up front. A filterable map of all 50 states.')),h(TileMap),h('h3',null,'PAID TO',h('br'),'PREPARE'),h('small',null,'Policy / Insurance / PACE'))}
];
const count=key=>key==='all'?projects.length:projects.filter(p=>p.topics.includes(key)).length;
const pad=n=>String(n).padStart(2,'0');

function Projects(){
 const [topic,setTopic]=useState('all');
 const shown=projects.filter(p=>topic==='all'||p.topics.includes(topic));
 return h('section',{className:'projects',id:'projects','aria-labelledby':'projects-title'},
 h('div',{className:'projects-label'},
  h('h2',{id:'projects-title'},'Selected projects'),
  h('div',{className:'project-filters',role:'group','aria-label':'Filter projects by topic'},
   ...topics.map(t=>h('button',{key:t.key,type:'button',className:'project-filter','aria-pressed':topic===t.key,onClick:()=>setTopic(t.key)},t.label,h('span',{className:'project-filter-count'},count(t.key))))),
  h('span',{className:'projects-count','aria-live':'polite'},topic==='all'?`01 — ${pad(projects.length)}`:`${pad(shown.length)} of ${pad(projects.length)}`)),
 h('div',{className:'project-grid'+(topic==='all'?'':' is-filtered')},...shown.map(p=>h(React.Fragment,{key:p.id},p.render()))));
}


function Footer(){return h('footer',{className:'site-footer',id:'footer'},
 h('p',{className:'footer-copyright'},'© Harvard MDE Undercurrents 2026'),
 h('nav',{'aria-label':'Footer navigation',className:'footer-navigation'},
  h('a',{href:'#home'},'Home'),
  h('a',{href:'#projects'},'Projects'),
  h('a',{href:'./who-we-are-talking-to.html'},'Network')));}

function App(){
 useEffect(()=>{if(location.hash==='#projects'){requestAnimationFrame(()=>document.getElementById('projects')?.scrollIntoView({behavior:'instant',block:'start'}))}},[]);
 const [progress,setProgress]=useState(0);
 // The site header (assets/site-header.js) handles its own overlay/solid state.
 useEffect(()=>{let frame;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>setProgress(Math.min(1,Math.max(0,window.scrollY/(window.innerHeight*2.85)))))};update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)}},[]);
 return h(React.Fragment,null,
 h('main',null,h('section',{className:'scroll-stage',id:'home'},h('div',{className:'hero',style:{'--progress':progress,'--reveal':Math.min(1,Math.max(0,(progress-.12)*3))}},
 h('video',{className:'hero-video',src:'./desert.mp4',autoPlay:true,muted:true,loop:true,playsInline:true,preload:'auto','aria-hidden':true}),h('div',{className:'video-wash','aria-hidden':true}),
 h('svg',{width:0,height:0,'aria-hidden':true,style:{position:'absolute'}},
 h('defs',null,h('filter',{id:'title-smoke',x:'-50%',y:'-100%',width:'200%',height:'300%',colorInterpolationFilters:'sRGB'},
 h('feTurbulence',{type:'fractalNoise',baseFrequency:'.018 .035',numOctaves:2,seed:12,result:'noise'}),
 h('feDisplacementMap',{in:'SourceGraphic',in2:'noise',scale:progress*145,xChannelSelector:'R',yChannelSelector:'G'}),
 h('feGaussianBlur',{stdDeviation:progress*10})))),
 h('h1',{className:'title smoke-title','aria-label':'UNDERCURRENTS'},
 h('span',{className:'smoke-solid','aria-hidden':true},...Array.from('UNDERCURRENTS').map((letter,i)=>{
 const t=Math.min(1,Math.max(0,(progress-.035-(i%4)*.018)/.60));
 return h('span',{key:i,className:'smoke-letter',style:{opacity:Math.pow(1-t,1.8),filter:`blur(${t*t*17}px)`,transform:`translate(${Math.sin(i*2.3)*t*18}px,${-t*t*(45+(i%3)*22)}px) scale(${1+t*.12})`}},letter)})),
 h('span',{className:'smoke-vapor','aria-hidden':true,style:{opacity:Math.sin(Math.min(1,progress/.70)*Math.PI)*.38,transform:`translate(${progress*24}px,${-progress*115}px) scale(${1+progress*.08})`}},'UNDERCURRENTS')),
 h('div',{className:'landing-note',style:{opacity:Math.pow(1-Math.min(1,Math.max(0,(progress-.06)/.57)),1.5),transform:`translateY(${-progress*22}px)`,filter:`blur(${progress*3}px)`}},h(Handwriting)),
 h('div',{className:'hero-footer'},h('span',null,'UC - STUDIO'),h('span',{className:'scroll-cue'},'Scroll to explore',h('b',{'aria-hidden':true},'↓'))))),
 h(Projects)),h(Footer));
}
createRoot(document.getElementById('root')).render(h(App));
