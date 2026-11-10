/* Open Blog 2 at the top unless a deep link asks otherwise. The header itself is ../../assets/site-header.js. */
if('scrollRestoration' in history)history.scrollRestoration='manual';
window.addEventListener('pageshow',()=>{if(!location.hash||location.hash==='#blog-top')window.scrollTo(0,0)});
