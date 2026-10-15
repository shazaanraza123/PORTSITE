const {B,launch,VP,init,ws,ok}=require('./s5-common');const fs=require('fs');const AXE=fs.readFileSync(require.resolve('axe-core/axe.min.js'),'utf8');
async function axe(p,label,ctxSel){await p.addScriptTag({content:AXE});const r=await p.evaluate(async s=>{const r=await axe.run(s?{include:[s]}:document,{runOnly:['wcag2a','wcag2aa','best-practice']});return r.violations.map(v=>({id:v.id,impact:v.impact,n:v.nodes.length,t:v.nodes.slice(0,3).map(x=>x.target.join(' '))}))},ctxSel);
 const bad=r.filter(v=>v.impact==='critical'||v.impact==='serious');console.log('axe '+label+':',r.length?JSON.stringify(r):'clean');ok('axe '+label+' no serious/critical',!bad.length);return r}
(async()=>{const b=await launch();
for(const [name,o] of Object.entries(VP)){const ctx=await b.newContext(o);await ctx.addInitScript(init);const p=await ctx.newPage();
 await p.goto(B+'/',{waitUntil:'networkidle'});await p.waitForTimeout(2000);
 await axe(p,name+' bench');
 // keyboard: first stops from the top
 if(name==='desktop'){const seq=[];for(let i=0;i<10;i++){await p.keyboard.press('Tab');seq.push(await p.evaluate(()=>{const e=document.activeElement;const cs=getComputedStyle(e);return (e.getAttribute('aria-label')||e.textContent||e.tagName).trim().slice(0,28)+(cs.outlineStyle==='none'&&cs.boxShadow==='none'?' [NO FOCUS RING]':'')}))}
  console.log('tab order:',seq.join(' | '));ok('focus visible on all stops',!seq.filter(s=>!/^Shazaan Raza/.test(s)).some(s=>s.includes('NO FOCUS')));
  // index via keyboard: open, type, Enter on first result
  await p.focus('#n-index');await p.keyboard.press('Enter');await p.waitForTimeout(2500);ok('Index opens, focus in search',await p.evaluate(()=>document.activeElement.id==='index-q'));
  await p.keyboard.type('belt');await p.waitForTimeout(2000);const rows=await p.$$eval('#index-body .irow',r=>r.map(x=>x.textContent.slice(0,30)));console.log('search "belt":',rows);
  await p.keyboard.press('Escape');await p.waitForTimeout(2000);ok('Escape closes Index',await p.evaluate(()=>document.getElementById('index').hidden));
  // tag: open object via engine, Escape closes and the tag is hidden
  await p.evaluate(w=>eval(w).bench.inspectById('disc'),ws);await p.waitForSelector('#a-tag:not([hidden])',{timeout:20000});
  const tagInfo=await p.evaluate(()=>({h:document.getElementById('a-tag-h').textContent,btns:[...document.querySelectorAll('#a-tag button,#a-tag a')].map(e=>e.textContent.trim().slice(0,18))}));console.log('disc tag',JSON.stringify(tagInfo));
  await p.keyboard.press('Escape');await p.waitForTimeout(3000);ok('Escape closes tag',await p.evaluate(()=>document.getElementById('a-tag').hidden));
  // turn tape by keyboard
  await p.focus('#turn');await p.keyboard.press('Enter');await p.waitForFunction(w=>eval(w).room.progress()>.99,ws,{timeout:30000});ok('turn tape works from keyboard',true);
  // wall item by keyboard
  const flipped=await p.evaluate(()=>{const it=document.querySelector('#wall-layer .it.flippable[tabindex]');it.focus();it.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',bubbles:true}));return it.classList.contains('flipped')});ok('wall item flips from keyboard',flipped);
 } else {await p.evaluate(w=>eval(w).room.goWall(),ws);await p.waitForTimeout(3500)}
 await axe(p,name+' wall','#wall-layer');
 // tap targets on phone
 if(name==='mobile'){const small=await p.evaluate(()=>[...document.querySelectorAll('button,a')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.height&&getComputedStyle(e).visibility!=='hidden'&&(r.height<24||r.width<24)&&r.bottom>0&&r.top<innerHeight}).filter(e=>{const r=e.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;const hit=(x,y)=>{const h=document.elementFromPoint(x,y);return h&&(h===e||e.contains(h))};return !(hit(cx,cy-11.5)&&hit(cx,cy+11.5)&&hit(cx-11.5,cy)&&hit(cx+11.5,cy))}).map(e=>(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,20)+' '+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height)));console.log('targets under 24px on phone wall view:',small)}
 await p.goto(B+'/work/kwl-studio',{waitUntil:'networkidle'});await axe(p,name+' case page');
 await ctx.close()}
// reduced motion
{const ctx=await b.newContext({...VP.desktop,reducedMotion:'reduce'});const p=await ctx.newPage();await p.goto(B+'/',{waitUntil:'networkidle'});await p.waitForTimeout(1500);
 await p.click('#turn');await p.waitForTimeout(400);const pr=await p.evaluate(w=>eval(w).room.progress(),ws);const tf=await p.evaluate(()=>document.getElementById('wall-layer').style.transform);ok('reduced motion: instant jump, no swing',pr>.99&&tf==='none',pr+' '+tf);await ctx.close()}
await b.close()})();
