const {chromium}=require('playwright-core');
const B='http://127.0.0.1:4173';
const ok=(n,c,x='')=>console.log((c?'PASS ':'FAIL ')+n,x);
(async()=>{const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
const p=await (await b.newContext({viewport:{width:1280,height:800}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
const ws=()=>p.evaluate(()=>!!document.querySelector('#bench-gl canvas'));
// 1 bench tag View project -> case page, in place
await p.goto(B+'/',{waitUntil:'networkidle'});await p.waitForTimeout(1500);
await p.evaluate(()=>[...document.querySelectorAll('div')].find(d=>d.__workshop)?.__workshop.bench.inspectById('belt'));
await p.waitForSelector('#a-tag-acts a.ext',{timeout:20000});
const href=await p.getAttribute('#a-tag-acts a.ext','href');
let navs=0;p.on('framenavigated',f=>{if(f===p.mainFrame())navs++});
await p.click('#a-tag-acts a.ext');await p.waitForSelector('.cs-page h1',{timeout:15000});
ok('bench View project',p.url().endsWith('/work/kwl-studio'),href+' fullnav='+navs+' title='+await p.title());
// 2 back -> workshop
await p.goBack();await p.waitForSelector('#bench-gl canvas',{timeout:20000});ok('back to workshop',p.url()===B+'/');
await p.goForward();await p.waitForSelector('.cs-page h1');
// 3 On the bench deep link
await p.click('text=On the bench');await p.waitForSelector('#bench-gl canvas',{timeout:20000});
await p.waitForFunction(()=>!document.getElementById('a-tag').hidden&&/Star Belt|KWL/.test(document.getElementById('a-tag').textContent),null,{timeout:60000}).then(()=>ok('#b-belt opens belt',true,p.url())).catch(()=>ok('#b-belt opens belt',false));
// 4 thinking deep link
await p.goto(B+'/work/kwl-studio');await p.waitForSelector('.cs-page h1');
await p.click('text=The thinking, on the wall');
await p.waitForFunction(()=>!!document.querySelector('.glow'),null,{timeout:90000}).then(async()=>ok('#t- highlights wall item',true,await p.evaluate(()=>document.querySelector('.glow').className))).catch(()=>ok('#t- highlights wall item',false));
// 5 wall cslink
const cl=await p.$$eval('a.cslink',a=>a.map(x=>x.getAttribute('href')));ok('wall cslinks present',cl.length>=5,cl.join(' '));
await p.evaluate(()=>document.querySelector('a.cslink').click());await p.waitForSelector('.cs-page h1',{timeout:15000});ok('wall cslink navigates',/\/work\//.test(p.url()),p.url());
// 6 index icase
await p.goto(B+'/');await p.waitForSelector('#n-index');await p.click('#n-index');
const ic=await p.$$eval('a.icase',a=>a.length);await p.click('a.icase >> nth=0');await p.waitForSelector('.cs-page h1');ok('index case link',ic>=8,ic+' links -> '+p.url());
// 7 next link + unknown slug + direct load
await p.click('.cs-next');await p.waitForTimeout(400);ok('next link',/\/work\//.test(p.url()),p.url());
await p.goto(B+'/work/nope');ok('unknown slug',await p.textContent('h1')==='Nothing on the bench by that name.');
ok('no page errors',errs.length===0,errs.join('|'));
await b.close()})();
