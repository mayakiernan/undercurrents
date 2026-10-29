import React, {useEffect,useState} from 'https://esm.sh/react@19.0.0';
import {createRoot} from 'https://esm.sh/react-dom@19.0.0/client';
const h=React.createElement;
const phrase='of the future to come';
function Handwriting(){return h('span',{'aria-label':phrase},...Array.from(phrase).map((letter,i)=>h('span',{key:i,className:'hand-letter','aria-hidden':true,style:{'--i':i}},letter===' '?'\u00a0':letter)));}

const latin='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
function Projects(){return h('section',{className:'projects',id:'projects','aria-labelledby':'projects-title'},
 h('div',{className:'projects-label'},h('h2',{id:'projects-title'},'Selected projects'),h('span',null,'01 — 04')),
 h('div',{className:'project-grid'},
 h('article',{className:'project project-grown'},h('div',{className:'project-heading'},h('h3',null,'GROWN',h('br'),'TO DIE'),h('span',{className:'project-number'},'01')),h('img',{className:'cotton-image',src:'./cotton.png',alt:'Black line drawing of a cotton stem'}),h('p',null,'If you were told there was a 4% chance of survival you would be worried. But in some Texas counties that’s becoming the norm for entire fields of crops. An analysis of Texas cotton and an insurance system unincentivizing adaptation.'),h('small',null,'Research / Texas cotton')),
 h('article',{className:'project project-two'},h('div',{className:'project-heading'},h('p',null,latin),h('span',{className:'project-number'},'02')),h('div',{className:'empty-space','aria-hidden':true}),h('h3',null,'TERRA',h('br'),'INCOGNITA'),h('small',null,'Lorem ipsum / Dolor sit')),
 h('article',{className:'project project-three'},h('h3',null,'FORMA',h('br'),'ET MATERIA'),h('div',{className:'empty-space','aria-hidden':true}),h('div',{className:'project-heading'},h('p',null,latin),h('span',{className:'project-number'},'03')),h('small',null,'Consectetur / Adipiscing')),
 h('article',{className:'project project-four'},h('div',{className:'project-heading'},h('span',{className:'project-number'},'04'),h('p',null,latin)),h('div',{className:'empty-space','aria-hidden':true}),h('h3',null,'TEMPUS',h('br'),'FUTURUM'),h('small',null,'Ut enim / Ad minim'))
 ));}

function App(){
 const [progress,setProgress]=useState(0),[open,setOpen]=useState(false);
 useEffect(()=>{let frame;const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>setProgress(Math.min(1,Math.max(0,window.scrollY/(window.innerHeight*.95)))))};update();window.addEventListener('scroll',update,{passive:true});window.addEventListener('resize',update);return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);window.removeEventListener('resize',update)}},[]);
 useEffect(()=>{document.body.style.overflow=open?'hidden':'';const close=e=>{if(e.key==='Escape')setOpen(false)};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[open]);
 return h(React.Fragment,null,
 h('header',null,h('a',{href:'#',className:'logo','aria-label':'UC home'},'UC'),h('button',{className:'menu-button'+(open?' active':''),'aria-label':open?'Close menu':'Open menu','aria-expanded':open,'aria-controls':'navigation',onClick:()=>setOpen(!open)},...[1,2,3].map(i=>h('span',{key:i})))),
 open&&h('nav',{id:'navigation',className:'overlay','aria-label':'Main navigation'},h('a',{href:'#home',onClick:()=>setOpen(false)},'UNDERCURRENTS'),h('a',{href:'#projects',onClick:()=>setOpen(false)},'PROJECTS'),h('small',null,'SUS / undercurrents')),
 h('main',null,h('section',{className:'scroll-stage',id:'home'},h('div',{className:'hero',style:{'--progress':progress,'--reveal':Math.min(1,Math.max(0,(progress-.12)*3))}},
 h('video',{className:'hero-video',src:'./desert.mp4',autoPlay:true,muted:true,loop:true,playsInline:true,preload:'auto','aria-hidden':true}),h('div',{className:'video-wash','aria-hidden':true}),
 h('h1',{className:'title','aria-label':'UNDERCURRENTS'},h('span',{'aria-hidden':true,className:'top',style:{transform:`translate(${-progress*7}vw,${-progress*22}vh) rotate(${-progress*2}deg)`}},'UNDERCURRENTS'),h('span',{'aria-hidden':true,className:'bottom',style:{transform:`translate(${progress*7}vw,${progress*22}vh) rotate(${progress*2}deg)`}},'UNDERCURRENTS')),
 h('div',{className:'landing-note'},h(Handwriting)),
 h('div',{className:'hero-footer'},h('span',null,'SUS — undercurrents'),h('span',{className:'scroll-cue'},'Scroll to unfold',h('b',{'aria-hidden':true},'↓'))))),
 h(Projects)));
}
createRoot(document.getElementById('root')).render(h(App));
