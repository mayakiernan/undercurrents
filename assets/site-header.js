/* Shared Undercurrents header. Include once per page:
     <link rel="stylesheet" href="{root}/assets/site-header.css">
     <script src="{root}/assets/site-header.js" defer></script>
   Optional: <body data-header="overlay"> keeps the header transparent until the
   element matching .scroll-stage has scrolled under it (home page hero). */
(function(){
 const script=document.currentScript;
 const root=new URL('../',script.src);
 const url=path=>new URL(path,root).href;
 const links=[
  {key:'home',label:'Home',href:url('index.html#home')},
  {key:'projects',label:'Projects',href:url('index.html#projects')},
  {key:'network',label:'Network',href:url('who-we-are-talking-to.html')}
 ];

 const page=location.pathname.replace(/\/+$/,'/index.html');
 const isHome=/\/index\.html$/.test(page)&&!/\/Blog2\//.test(page);
 const isNetwork=/who-we-are-talking-to\.html$/.test(page);
 const isBlog=!isHome&&!isNetwork;

 const header=document.createElement('div');
 header.className='uc-header';header.setAttribute('role','banner');
 header.innerHTML='<div class="uc-header__bar">'+
  '<a class="uc-header__logo" href="'+url('index.html#home')+'" aria-label="Undercurrents home">UC</a>'+
  '<nav class="uc-header__nav" id="uc-header-nav" aria-label="Main navigation">'+
   links.map(l=>'<a href="'+l.href+'" data-key="'+l.key+'">'+l.label+'</a>').join('')+
  '</nav>'+
  '<button class="uc-header__menu" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="uc-header-nav"><span></span><span></span><span></span></button>'+
 '</div>';
 document.body.prepend(header);

 const nav=header.querySelector('nav'),button=header.querySelector('button');
 function setCurrent(key){nav.querySelectorAll('a').forEach(a=>{if(a.dataset.key===key)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current')})}
 setCurrent(isNetwork?'network':isBlog?'projects':'home');

 function setMenu(open){nav.classList.toggle('is-open',open);button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close menu':'Open menu');update()}
 button.addEventListener('click',()=>setMenu(!nav.classList.contains('is-open')));
 nav.addEventListener('click',e=>{if(e.target.closest('a'))setMenu(false)});
 document.addEventListener('click',e=>{if(!header.contains(e.target)&&nav.classList.contains('is-open'))setMenu(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('is-open')){setMenu(false);button.focus()}});

 const overlay=document.body.dataset.header==='overlay';
 if(overlay)header.classList.add('uc-header--overlay');
 let frame=0;
 function update(){
  cancelAnimationFrame(frame);
  frame=requestAnimationFrame(()=>{
   const bottom=header.getBoundingClientRect().bottom;
   if(overlay){
    const hero=document.querySelector('.scroll-stage');
    const overHero=!hero||hero.getBoundingClientRect().bottom>bottom+1; // hero not rendered yet = still at the top
    header.classList.toggle('uc-header--overlay',overHero&&!nav.classList.contains('is-open'));
   }
   if(isHome){
    const projects=document.getElementById('projects');
    setCurrent(projects&&projects.getBoundingClientRect().top<=bottom+40&&projects.getBoundingClientRect().bottom>bottom?'projects':'home');
   }
  });
 }
 if(overlay||isHome){update();addEventListener('scroll',update,{passive:true});addEventListener('resize',update);addEventListener('load',update)}
})();
