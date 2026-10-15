const {B,launch,VP,init,ws,ok}=require('./s5-common');
(async()=>{const b=await launch();
// 1. phone wall: pan-y on items, a cancelled gesture is not a tap
{const ctx=await b.newContext(VP.mobile);await ctx.addInitScript(init);const p=await ctx.newPage();await p.goto(B+'/',{waitUntil:'networkidle'});await p.waitForTimeout(1500);
 await p.evaluate(w=>eval(w).room.goWall(),ws);await p.waitForTimeout(3500);
 const r=await p.evaluate(()=>{const it=document.querySelector('#wall-layer .it.flippable');const ta=getComputedStyle(it).touchAction;const before=it.classList.contains('flipped');
  const o={bubbles:true,pointerId:7,pointerType:'touch',clientX:100,clientY:300,isPrimary:true};it.dispatchEvent(new PointerEvent('pointerdown',o));it.dispatchEvent(new PointerEvent('pointercancel',o));
  const afterCancel=it.classList.contains('flipped');return {ta,before,afterCancel,n:document.querySelectorAll('#wall-layer .it').length,pany:[...document.querySelectorAll('#wall-layer .it')].filter(e=>getComputedStyle(e).touchAction==='pan-y').length}});
 ok('phone wall items scroll vertically',r.pany===r.n,JSON.stringify(r));ok('cancelled gesture is not a tap',r.before===r.afterCancel);await ctx.close()}
// 2. desktop wall items still fully draggable
{const ctx=await b.newContext(VP.desktop);const p=await ctx.newPage();await p.goto(B+'/',{waitUntil:'networkidle'});await p.evaluate(w=>eval(w).room.goWall(),ws);await p.waitForTimeout(3500);
 ok('desktop wall items keep touch-action none',await p.evaluate(()=>[...document.querySelectorAll('#wall-layer .it')].every(e=>getComputedStyle(e).touchAction==='none')));await ctx.close()}
// 3. mount/unmount round trips: canvases, GL contexts, heap
{const ctx=await b.newContext(VP.desktop);await ctx.addInitScript(init);const p=await ctx.newPage();const warn=[];p.on('console',m=>{if(/WebGL|context/i.test(m.text()))warn.push(m.text())});
 const cdp=await ctx.newCDPSession(p);const heap=async()=>{await cdp.send('HeapProfiler.collectGarbage');return Math.round((await cdp.send('Runtime.getHeapUsage')).usedSize/1e6)};
 await p.goto(B+'/',{waitUntil:'networkidle'});await p.waitForTimeout(2000);const h0=await heap();
 const N=18;for(let i=0;i<N;i++){await p.evaluate(()=>{const a=document.createElement('a');a.href='/work/kwl-studio';document.body.appendChild(a);a.click()});await p.waitForSelector('.cs-page h1');
  await p.goBack();await p.waitForSelector('#bench-gl canvas');await p.waitForTimeout(400)}
 await p.waitForTimeout(1500);const h1=await heap();const cv=await p.evaluate(()=>document.querySelectorAll('canvas').length);
 console.log(`after ${N} round trips: heap ${h0}MB → ${h1}MB, canvases ${cv}, GL warnings ${warn.length}`,warn.slice(0,2));
 ok('no lost/too-many GL contexts',warn.length===0);ok('heap growth under 25MB',h1-h0<25,(h1-h0)+'MB');
 const alive=await p.evaluate(()=>{const c=document.querySelector('#bench-gl canvas');const g=c.getContext('webgl2')||c.getContext('webgl');return g&&!g.isContextLost()});ok('bench GL alive after round trips',alive);await ctx.close()}
await b.close()})();
