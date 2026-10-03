import { chromium } from 'playwright-chromium'
import { mkdir, writeFile, readFile } from 'node:fs/promises'
import { parseSync } from '@slidev/parser'
const deck=parseSync(await readFile('slides.md','utf8')).slides
const component=n=>deck[n-1]?.content.match(/<([A-Z][A-Za-z]+)(?:\s|\s*\/)/)?.[1]
const animated=n=>!!component(n)&&!['SlidevVideo','ResearchVideo','RoadMosaic','FieldContactMosaic','MatchingUncertainty','CwExample'].includes(component(n))
const durationFor=n=>component(n)==='TrustScene'?18:20
const axesSlide=deck.findIndex(s=>s.title?.startsWith('Deux façons'))+1
await import('./check-swarm-geometry.mjs')
await import('./check-fleet-geometry.mjs')
const options=Object.fromEntries(process.argv.slice(2).filter(a=>a.startsWith('--')&&a.includes('=')).map(a=>a.slice(2).split('=')))
const base=options.url||process.env.SLIDE_URL||'http://localhost:3042',folder=options.out||process.env.QA_DIR||'qa/animation'
const loops=process.argv.includes('--loops'),posters=process.argv.includes('--posters')
await mkdir(folder,{recursive:true});await mkdir('public/media/posters',{recursive:true})
const browser=await chromium.launch({headless:true})
const context=await browser.newContext({viewport:{width:1600,height:900},deviceScaleFactor:1,...(loops?{recordVideo:{dir:`${folder}/video`,size:{width:1600,height:900}}}:{})})
const page=await context.newPage(),issues=[],external=[],performanceResults=[]
page.on('pageerror',e=>issues.push({type:'javascript',message:e.message}))
page.on('response',r=>{if(r.status()>=400&&!posters)issues.push({type:'http',url:r.url(),status:r.status()})})
await context.route('**/*',route=>{const url=route.request().url();if(url.startsWith('http')&&!url.startsWith(base)){external.push(url);return route.abort()}return route.continue()})
const seek=async t=>{await page.evaluate(t=>window.dispatchEvent(new CustomEvent('animation-seek',{detail:t})),t);await page.waitForTimeout(100)}
const targetSlides=(options.slides||process.env.QA_SLIDES)?.split(',').map(Number)||Array.from({length:deck.length},(_,i)=>i+1)
for(const n of targetSlides){
 await page.goto(`${base}/?animationTest#/${n}`,{waitUntil:'load'})
 const slide=page.locator(`.slidev-page[data-slidev-no="${n}"]`);await slide.waitFor({state:'visible'});await page.waitForTimeout(650)
 if(component(n)==='RoadMosaic'&&await slide.locator('.road-photo img').count()!==12)issues.push({slide:n,type:'missing-road-mosaic'})
 if(component(n)==='FieldContactMosaic'&&await slide.locator('.field-contact-mosaic img').count()!==4)issues.push({slide:n,type:'missing-contact-mosaic'})
 if(component(n)==='ResearchVideo'){
  const rates=[...deck[n-1].content.matchAll(/:playback-rate="([0-9.]+)"/g)].map(m=>Number(m[1]))
  const videos=slide.locator('video')
  await videos.first().evaluate(el=>el.readyState>=2?Promise.resolve():new Promise(resolve=>el.addEventListener('loadeddata',resolve,{once:true})))
  const before=await videos.evaluateAll(els=>els.map(v=>v.currentTime))
  await page.waitForTimeout(1100)
  const states=await videos.evaluateAll(els=>els.map(v=>({rate:v.playbackRate,time:v.currentTime,paused:v.paused,error:v.error?.message})))
  if(states.length!==rates.length||states.some((v,i)=>v.rate!==rates[i]||v.paused||v.error||v.time-before[i]<rates[i]*.6))issues.push({slide:n,type:'video-playback',before,states,rates})
  console.log(`Video playback ${n}: ${JSON.stringify(states)}`)
 }
 if(posters){await seek(16);for(const world of await slide.locator('.world-scene').all()){const kind=await world.getAttribute('data-kind');const png=await world.locator('canvas').evaluate(el=>el.toDataURL('image/png').split(',')[1]);await writeFile(`public/media/posters/${kind}.png`,Buffer.from(png,'base64'))}}
 if(loops&&animated(n)){
  const duration=durationFor(n)
  await page.evaluate(({n,duration})=>{window.dispatchEvent(new CustomEvent('animation-resume'));window.__frameStats=[];window.__resets=[];let last=performance.now(),previous=0;function f(now){window.__frameStats.push(now-last);last=now;const el=document.querySelector(`.slidev-page[data-slidev-no="${n}"] [data-time]`);if(el){const t=Number(el.dataset.time);if(t<previous)window.__resets.push({previous,time:t,expected:previous>duration-1});previous=t}window.__qaRAF=requestAnimationFrame(f)}window.__qaRAF=requestAnimationFrame(f)},{n,duration})
  // Opening: 30 s; deployment: 20 s; other scenes retain 2x playback.
  const loopSeconds=component(n)==='CityMap'?30:component(n)==='DeploymentScene'?20:duration/2
  await page.waitForTimeout((loopSeconds*2+1)*1000)
  const perf=await page.evaluate(()=>{cancelAnimationFrame(window.__qaRAF);const a=window.__frameStats.slice(5);return{resets:window.__resets,fps:1000/(a.reduce((s,v)=>s+v,0)/a.length),p95ms:[...a].sort((a,b)=>a-b)[Math.floor(a.length*.95)],frames:a.length}})
  performanceResults.push({slide:n,...perf});if((perf.resets.length!==2||perf.resets.some(r=>!r.expected)))issues.push({slide:n,type:'loop-reset',resets:perf.resets});if(perf.fps<30)issues.push({slide:n,type:'performance',...perf});console.log(`Two loops: slide ${n}, ${perf.fps.toFixed(1)} fps`)
 }
 const snapshots=component(n)==='NavigationFlow'?[1,1.8,3.4,5.8,7.5,9,13,16,19.65]:animated(n)?[1,5,9,13,16,17.65,19.65]:[16]
 for(const t of snapshots){
  if(t>durationFor(n))continue
  await seek(t)
  const errors=await slide.evaluate(root=>{const errors=[],bounds=root.getBoundingClientRect();for(const img of root.querySelectorAll('img'))if(!img.complete||!img.naturalWidth)errors.push(`Missing image: ${img.getAttribute('src')}`);for(const el of root.querySelectorAll('h1,h2,p,.stage-line,.question-row,.credit,.criteria,.result-pair,.motion-phases,.scene-legend')){if(el.scrollWidth>el.clientWidth+3)errors.push(`Overflow: ${el.textContent}`);const b=el.getBoundingClientRect();if(b.bottom>bounds.bottom-30&&!el.classList.contains('credit'))errors.push(`Bottom overflow: ${el.textContent}`)}for(const el of root.querySelectorAll('svg text')){if(getComputedStyle(el).opacity==='0')continue;const b=el.getBoundingClientRect();if(b.left<bounds.left-1||b.right>bounds.right+1||b.top<bounds.top-1||b.bottom>bounds.bottom-20)errors.push(`SVG outside: ${el.textContent}`)}return errors})
  if(errors.length)issues.push({slide:n,time:t,errors})
  await page.screenshot({path:`${folder}/slide-${String(n).padStart(2,'0')}-t${t}.png`})
 }
 if(['NavigationFlow','DeploymentScene'].includes(component(n))){
  // Check vehicle poses against the browser's actual SVG path, not a duplicate route formula.
  const navigation=component(n)==='NavigationFlow',name=navigation?'navigation':'deployment',end=navigation?17:5,start=navigation?12:1
  const geometry=await page.evaluate(async ({name,start,end,n})=>{
   const root=document.querySelector(`.slidev-page[data-slidev-no="${n}"]`)
   const path=root.querySelector(`[data-route="${name}"]`),vehicle=root.querySelector(`[data-vehicle="${name}"]`),length=path.getTotalLength();let worst=0,maxHeadingError=0
   for(let j=0;j<=70;j++){
    const t=start+(end-start)*j/70;window.dispatchEvent(new CustomEvent('animation-seek',{detail:t}));await new Promise(requestAnimationFrame)
    const m=vehicle.transform.baseVal.consolidate().matrix;let best=Infinity,at=0
    for(let k=0;k<=1500;k++){const d=length*k/1500,p=path.getPointAtLength(d),e=Math.hypot(m.e-p.x,m.f-p.y);if(e<best){best=e;at=d}}
    worst=Math.max(worst,best);const a=path.getPointAtLength(Math.max(0,at-.2)),b=path.getPointAtLength(Math.min(length,at+.2));const angle=Math.atan2(m.b,m.a),target=Math.atan2(b.y-a.y,b.x-a.x),diff=Math.abs(Math.atan2(Math.sin(angle-target),Math.cos(angle-target)))*180/Math.PI;maxHeadingError=Math.max(maxHeadingError,diff)
   }
   let maxPlanLength=0,maxPlanOriginError=0,maxLidarOriginError=0,continuous=true
   if(name==='navigation')for(const t of [.2,3,7,10,14,17]){
    window.dispatchEvent(new CustomEvent('animation-seek',{detail:t}));await new Promise(requestAnimationFrame)
    const m=vehicle.transform.baseVal.consolidate().matrix,plan=root.querySelector('[data-local-plan]'),lidar=root.querySelector('[data-lidar="continuous"]'),ray=lidar?.querySelector('line')
    continuous&&=!!ray&&getComputedStyle(lidar).opacity==='1'&&!!plan?.getAttribute('d')
    if(plan){const p=plan.getPointAtLength(0);maxPlanLength=Math.max(maxPlanLength,plan.getTotalLength());maxPlanOriginError=Math.max(maxPlanOriginError,Math.hypot(p.x-m.e,p.y-m.f))}
    if(ray)maxLidarOriginError=Math.max(maxLidarOriginError,Math.hypot(Number(ray.getAttribute('x1'))-m.e,Number(ray.getAttribute('y1'))-m.f))
   }
   return {worst,maxHeadingError,maxPlanLength,maxPlanOriginError,maxLidarOriginError,continuous}
  },{name,start,end,n});if(geometry.worst>1||geometry.maxHeadingError>5)issues.push({slide:n,type:'vehicle-path',...geometry});if(navigation&&(!geometry.continuous||geometry.maxPlanLength>83||geometry.maxPlanOriginError>.1||geometry.maxLidarOriginError>.1))issues.push({slide:n,type:'continuous-navigation',...geometry});console.log(`Route geometry ${n}: ${JSON.stringify(geometry)}`)
 }
 if(n<deck.length){await page.keyboard.press('ArrowRight');await page.waitForTimeout(180);if(!await page.locator(`.slidev-page[data-slidev-no="${n+1}"]`).isVisible())issues.push({slide:n,type:'navigation'});await page.keyboard.press('ArrowLeft');await page.waitForTimeout(150);const time=await slide.locator('[data-time]').count()?Number(await slide.locator('[data-time]').first().getAttribute('data-time')):0;if(time>2)issues.push({slide:n,type:'restart',time})}
 console.log(`Inspected slide ${n}`)
}
if(!posters&&!loops){
 await page.goto(`${base}/?animationTest#/presenter/${axesSlide}`,{waitUntil:'load'});await page.waitForTimeout(500);await seek(16);await page.screenshot({path:`${folder}/presenter.png`});if(!(await page.locator('body').innerText()).includes('Deux façons'))issues.push({type:'presenter'})
 await page.setViewportSize({width:1366,height:768});for(const n of deck.map((_,i)=>i+1)){await page.goto(`${base}/?animationTest#/${n}`,{waitUntil:'load'});await seek(16);await page.screenshot({path:`${folder}/laptop-${n}.png`})}
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(`${base}/#/1`,{waitUntil:'load'});await page.waitForTimeout(400);if(await page.locator('.slidev-page[data-slidev-no="1"] canvas').count())issues.push({type:'reduced-motion',message:'Canvas in static mode'});await page.screenshot({path:`${folder}/reduced-motion.png`})
 await page.emulateMedia({reducedMotion:'no-preference'});await page.goto(`${base}/#/overview`,{waitUntil:'load'});await page.locator('.slidev-page .cover-copy h1').first().waitFor({state:'visible'});await page.waitForTimeout(1000);await page.screenshot({path:`${folder}/overview.png`})
 const fallbackPage=await context.newPage();await fallbackPage.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/.test(type)?null:original.call(this,type,...args)}});await fallbackPage.goto(`${base}/#/1`,{waitUntil:'load'});await fallbackPage.waitForTimeout(500);const fallback=await fallbackPage.locator('.slidev-page[data-slidev-no="1"] [data-static]').getAttribute('data-static');if(fallback!=='true')issues.push({type:'webgl-fallback',fallback});await fallbackPage.screenshot({path:`${folder}/webgl-fallback.png`});await fallbackPage.close()

}
await context.close();await browser.close();await writeFile(`${folder}/checks${loops?'-loops':''}.json`,JSON.stringify({base,external,issues,performanceResults},null,2));console.log(JSON.stringify({external,issues,performanceResults},null,2));if(issues.length||external.length)process.exitCode=1
