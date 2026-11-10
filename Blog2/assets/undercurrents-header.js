
if('scrollRestoration' in history)history.scrollRestoration='manual';
const banner=document.createElement('div');banner.className='uc-blog-banner';banner.innerHTML='<a class="uc-blog-logo" href="../index.html" aria-label="UC home">UC</a><button class="uc-blog-menu" aria-label="Open menu" aria-expanded="false" aria-controls="uc-blog-navigation"><span></span><span></span><span></span></button>';
const nav=document.createElement('nav');nav.className='uc-blog-nav';nav.id='uc-blog-navigation';nav.hidden=true;nav.setAttribute('aria-label','Main navigation');nav.innerHTML='<a href="../index.html#home">Us</a><a href="../who-we-are-talking-to.html">Network</a><a href="../index.html#projects">Portfolio</a>';
document.body.prepend(banner,nav);
const button=banner.querySelector('button');function setMenu(open){nav.hidden=!open;button.setAttribute('aria-expanded',String(open));button.setAttribute('aria-label',open?'Close menu':'Open menu')}
button.addEventListener('click',()=>setMenu(nav.hidden));document.addEventListener('keydown',e=>{if(e.key==='Escape'){setMenu(false);button.focus()}});
window.addEventListener('pageshow',()=>{if(!location.hash||location.hash==='#blog-top')window.scrollTo(0,0)});
