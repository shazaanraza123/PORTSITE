const {B,launch,VP,init,ws,ok}=require('./s5-common');
(async()=>{const b=await launch();const ctx=await b.newContext(VP.mobile);const p=await ctx.newPage();await p.goto(B+'/',{waitUntil:'networkidle'});await p.evaluate(w=>eval(w).room.goWall(),ws);await p.waitForTimeout(3500);
const n=await p.evaluate(()=>document.querySelectorAll('#wall-layer .tobench,#wall-layer .cslink,#wall-layer .stick').length);const bad=[];
for(let i=0;i<n;i++){const r=await p.evaluate(async i=>{const e=document.querySelectorAll('#wall-layer .tobench,#wall-layer .cslink,#wall-layer .stick')[i];const it=e.closest('.it');
  if(e.closest('.noteback')&&!it.classList.contains('flipped')){it.focus();it.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}))}
  const L=document.getElementById('wall-layer');await new Promise(r=>setTimeout(r,900));const r0=e.getBoundingClientRect();L.scrollTop+=r0.top-innerHeight*.3;await new Promise(r=>setTimeout(r,400));
  const r=e.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const hit=(x,y)=>{const h=document.elementFromPoint(x,y);return h===e||e.contains(h)};
  const who=(x,y)=>{const h=document.elementFromPoint(x,y);return h===e||e.contains(h)?'.':(h?h.tagName+'.'+String(h.className).slice(0,14):'-')};const res={t:e.textContent.trim().slice(0,22),pos:getComputedStyle(e).position,s:getComputedStyle(e).getPropertyValue('--s'),h:+r.height.toFixed(1),top:Math.round(r.top),probe:[who(cx,cy-11.5),who(cx,cy+11.5),who(cx-11.5,cy),who(cx+11.5,cy)].join(' '),ok:hit(cx,cy-11.5)&&hit(cx,cy+11.5)&&hit(cx-11.5,cy)&&hit(cx+11.5,cy)};
  if(e.closest('.noteback')){it.focus();it.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}))}return res},i);
 if(!r.ok&&r.h>0)bad.push(r)}
ok('every wall link has a 24px touch target on phones',!bad.length,n+' checked '+JSON.stringify(bad));await b.close()})();
