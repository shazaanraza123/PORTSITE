const {chromium}=require('playwright-core');
const slugs=['instagram-moodboard','kwl-studio','yzy-mobile','spotify-samples','ye-archive','ye-tour','spotify-map','yeezy-marketing','la-apparel','artist-marketing','creative-journey'];
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell'});
for(const vp of [[1440,900],[390,844]]){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]}});
 for(const s of slugs){const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/fonts|ERR_TUNNEL/.test(m.text()))errs.push(m.text())});
  const r=await p.goto('http://127.0.0.1:4173/work/'+s,{waitUntil:'networkidle'});
  await p.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,60))}scrollTo(0,0)});await p.waitForTimeout(600);
  const chk=await p.evaluate(()=>({h1:document.querySelector('h1')?.textContent,broken:[...document.images].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src.split('/cases/')[1]||i.src),imgs:document.images.length,videos:document.querySelectorAll('video').length,overflow:document.documentElement.scrollWidth>innerWidth+1,secs:document.querySelectorAll('.cs-sec').length,height:document.body.scrollHeight}));
  if(vp[0]===1440||['kwl-studio','ye-archive','instagram-moodboard','ye-tour'].includes(s))await p.screenshot({path:`cases/${s}-${vp[0]}.png`,fullPage:true});
  console.log(vp[0],s.padEnd(20),r.status(),JSON.stringify(chk),errs.length?errs:'');await p.close()}
 await ctx.close()}
await b.close()})();
