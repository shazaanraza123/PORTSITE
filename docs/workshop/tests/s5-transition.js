const {B,launch,VP,init,ws,ok}=require('./s5-common');
(async()=>{const b=await launch();
for(const [name,ctxo] of Object.entries(VP)){console.log('--',name);
 const ctx=await b.newContext(ctxo);await ctx.addInitScript(init);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(B+'/',{waitUntil:'networkidle'});await p.waitForTimeout(2500);
 const rows=[];
 for(const t of [0,.1,.3,.5,.6,.7,.86,.95,1]){
  await p.evaluate(t=>{const r=document.getElementById('room');const tot=r.offsetHeight-innerHeight;scrollTo(0,r.offsetTop+tot*t)},t);
  await p.waitForTimeout(2600);
  const d0=await p.evaluate('window.__draws');await p.waitForTimeout(2500);
  rows.push(await p.evaluate(([d0,w])=>{const W=eval(w);const wl=document.querySelector('.wall-layer')||document.getElementById('wall');const t=document.getElementById('turn');
   return {p:+W.room.progress().toFixed(3),cam:+W.bench.getView().toFixed(2),wallOp:+getComputedStyle(wl).opacity,wallPE:getComputedStyle(wl).pointerEvents,ariaHidden:wl.getAttribute('aria-hidden'),turn:t.textContent,draws:window.__draws-d0}},[d0,ws]));}
 console.table(rows);
 const mono=rows.every((r,i)=>!i||r.wallOp>=rows[i-1].wallOp-1e-3);ok(name+' wall fade monotonic',mono);
 ok(name+' bench renders at rest',rows[0].draws>0);ok(name+' bench stops on wall',rows.at(-1).draws===0,rows.at(-1).draws);
 ok(name+' wall interactive only when settled',rows.filter(r=>r.wallPE==='auto').every(r=>r.wallOp>.95));
 ok(name+' labels',rows[0].turn.includes('wall')&&rows.at(-1).turn.includes('bench'));
 // toggle button round trip
 await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(2500);
 await p.click('#turn');await p.waitForFunction(w=>eval(w).room.progress()>.99,ws,{timeout:30000}).then(()=>ok(name+' turn tape → wall',true)).catch(()=>ok(name+' turn tape → wall',false));
 await p.waitForTimeout(1500);await p.click('#turn');await p.waitForFunction(w=>eval(w).room.progress()<.01,ws,{timeout:30000}).then(()=>ok(name+' turn tape → bench',true)).catch(()=>ok(name+' turn tape → bench',false));
 await p.waitForTimeout(3000);const d1=await p.evaluate('window.__draws');await p.waitForTimeout(2500);ok(name+' bench resumes',await p.evaluate('window.__draws')>d1);
 ok(name+' no errors',!errs.length,errs.join('|'));await ctx.close();}
await b.close()})();
