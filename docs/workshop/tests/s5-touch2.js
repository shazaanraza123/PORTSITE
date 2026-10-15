const {B,launch,VP,init,ws,ok}=require('./s5-common');
(async()=>{const b=await launch();const ctx=await b.newContext(VP.mobile);await ctx.addInitScript(init);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const cdp=await ctx.newCDPSession(p);
async function swipe(x,y0,y1,steps=8){const pts=t=>[{x,y:t,id:1}];await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:pts(y0)});
 for(let i=1;i<=steps;i++){await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:pts(y0+(y1-y0)*i/steps)});await p.waitForTimeout(16)}
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]})}
await p.goto(B+'/',{waitUntil:'networkidle'});await p.waitForTimeout(2500);
const res=[];
for(const [x,y] of [[30,200],[360,420],[195,560],[60,690]]){await p.evaluate(()=>scrollTo(0,0));await p.waitForTimeout(1200);
 await swipe(x,y,y-200);const s0=await p.evaluate('scrollY');await p.waitForTimeout(2500);const s1=await p.evaluate('scrollY');res.push(`${x},${y}: ${s0}→${s1}`);console.log(res.at(-1))}

const panned=res.filter(r=>!/: 0→0/.test(r)).length;ok('bench swipe pans the page on empty space',panned>0,panned+'/'+res.length+' points');
const glided=res.filter(r=>{const m=r.match(/: (\d+)→(\d+)/);return +m[2]>+m[1]}).length;ok('momentum after release',glided>0,glided);
ok('no errors',!errs.length,errs.join('|'));await b.close()})();
