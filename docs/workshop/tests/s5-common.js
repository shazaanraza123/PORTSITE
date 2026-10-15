const {chromium}=require('playwright-core');
exports.B='http://127.0.0.1:4173';
exports.launch=()=>chromium.launch({executablePath:'/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell',args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
exports.VP={desktop:{viewport:{width:1440,height:900}},mobile:{viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true,userAgent:'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'}};
// count GL draw calls so we can tell whether the bench is rendering
exports.init=`(()=>{let s=1;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};window.__draws=0;for(const C of [WebGLRenderingContext,WebGL2RenderingContext]){for(const f of ['drawElements','drawArrays']){const o=C.prototype[f];C.prototype[f]=function(...a){window.__draws++;return o.apply(this,a)}}}})()`;
exports.ws=`[...document.querySelectorAll('div')].find(d=>d.__workshop).__workshop`;
exports.ok=(n,c,x='')=>{console.log((c?'PASS ':'FAIL ')+n,x);if(!c)process.exitCode=1};
