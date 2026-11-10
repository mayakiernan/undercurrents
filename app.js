import React, {useEffect,useState} from 'https://esm.sh/react@19.0.0';
import {createRoot} from 'https://esm.sh/react-dom@19.0.0/client';
const h=React.createElement;
const phrase='of the future to come';
function Handwriting(){return h('span',{'aria-label':phrase},...Array.from(phrase).map((letter,i)=>h('span',{key:i,className:'hand-letter','aria-hidden':true,style:{'--i':i}},letter===' '?'\u00a0':letter)));}

const latin='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

// Project filters. Add a topic here, then list its key in each project's `topics`.
const topics=[
 {key:'all',label:'All'},
 {key:'agriculture',label:'Agriculture'},
 {key:'housing',label:'Housing'},
 {key:'insurance',label:'Insurance'},
 {key:'upcoming',label:'Upcoming'}
];
const projects=[
 {id:'01',topics:['agriculture','insurance'],render:()=>h('article',{className:'project project-grown'},h('div',{className:'project-heading'},h('h3',null,'GROWN',h('br'),'TO DIE'),h('span',{className:'project-number'},'01')),h('img',{className:'cotton-image',src:'./cotton.png',alt:'Black line drawing of a cotton stem'}),h('p',null,'If you were told there was a 4% chance of survival you would be worried. But in some Texas counties that’s becoming the norm for entire fields of crops. An analysis of Texas cotton and an insurance system unincentivizing adaptation.'),h('small',null,'Research / Texas cotton'))},
 {id:'02',topics:['housing','insurance'],render:()=>h('a',{className:'project project-two project-built-in',href:'./Blog2.html#blog-top','aria-label':'Blog 2: Built In — resilience and material choice'},h('div',{className:'project-heading'},h('p',null,'Can you make resilience part of the renovation, not the reason for it? And if so, who is the stakeholder you need to get on board?'),h('span',{className:'project-number'},'02')),h('img',{className:'roof-card-image',src:'./Blog2/assets/slate-roof-hero.webp',alt:'Slate roofing tiles with loose overlapping slate samples',loading:'lazy'}),h('h3',null,'BUILT IN'),h('small',null,'RESILIENCE / MATERIAL CHOICE'))},
 {id:'03',topics:['upcoming'],render:()=>h('article',{className:'project project-three'},h('h3',null,'FORMA',h('br'),'ET MATERIA'),h('div',{className:'empty-space','aria-hidden':true}),h('div',{className:'project-heading'},h('p',null,latin),h('span',{className:'project-number'},'03')),h('small',null,'Consectetur / Adipiscing'))},
 {id:'04',topics:['upcoming'],render:()=>h('article',{className:'project project-four'},h('div',{className:'project-heading'},h('span',{className:'project-number'},'04'),h('p',null,latin)),h('div',{className:'empty-space','aria-hidden':true}),h('h3',null,'TEMPUS',h('br'),'FUTURUM'),h('small',null,'Ut enim / Ad minim'))}
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
