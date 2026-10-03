<script setup>
import { assetUrl } from '../lib/asset-url'
// Two real neural-map panels from distinct gallery samples illustrate candidate maps.
// Candidate poses and BEV placements are explanatory overlays, not measured matches.
// Broad overlapping modes illustrate ambiguity; this is not a model output.
const candidates=[{label:'A',x:133,chart:690,src:'/media/ambiguity/features-a.png'},{label:'B',x:343,chart:930,src:'/media/ambiguity/features-b.png'}]
const gaussian=(x,mean,sigma)=>Math.exp(-.5*((x-mean)/sigma)**2)/sigma
const samples=Array.from({length:501},(_,i)=>{
 const x=550+i
 return {x,w:.52*gaussian(x,690,74)+.48*gaussian(x,930,87)}
})
const total=samples.reduce((sum,p)=>sum+p.w,0)
const points=samples.map(p=>[p.x,270-50000*p.w/total])
const curve=points.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')
const area=`${curve}L1050 270H550Z`
const featureMatrix=`matrix(${48/119} ${-86/119} ${48/69} ${86/69} ${-46*48/119-530*48/69} ${46*86/119-530*86/69})`
</script>
<template>
<div class="motion-scene matching-uncertainty" data-static="true">
 <svg viewBox="0 0 1120 365" role="img" aria-label="Deux cartes neuronales et deux poses candidates illustratives. Une distribution à deux bosses larges et partiellement superposées représente plusieurs régions de poses plausibles.">
  <defs><clipPath id="ambiguity-bev"><path d="M0 0L-48-86H48Z"/></clipPath></defs>
  <rect x="24" y="48" width="430" height="274" rx="9" fill="#112b3c" stroke="#3a6176"/>
  <text x="239" y="71" text-anchor="middle" fill="#a7c4d5" style="font-size:14px">Deux cartes de caractéristiques apprises</text>
  <g v-for="c in candidates" :key="c.label">
   <svg :x="c.x-96" y="85" width="192" height="192" viewBox="550 754 380 380" style="overflow:hidden"><image :href="assetUrl(c.src)" width="1967" height="1172"/></svg>
   <g :transform="`translate(${c.x} 231)`">
    <g clip-path="url(#ambiguity-bev)" opacity=".5"><image href="/media/orienternet-architecture.png" width="600" height="630" :transform="featureMatrix"/></g>
    <path d="M0 0L-48-86H48Z" fill="none" stroke="#6cdbed" stroke-width="2.5"/>
    <circle r="5" fill="#fff" stroke="#17394a" stroke-width="2"/><path d="M0-6V-28m-5 7 5-7 5 7" stroke="#fff" fill="none" stroke-width="2.5"/>
   </g>
   <text :x="c.x" y="307" text-anchor="middle" fill="#6cdbed" style="font-size:20px">Pose {{c.label}}</text>
  </g>
  <path d="M478 180H515m-8-6 8 6-8 6" stroke="#77c8d8" stroke-width="2" fill="none"/>
  <!-- A normalized illustrative 1-D slice, with orientation fixed. -->
  <path d="M546 90V270H1075m-7-5 7 5-7 5" fill="none" stroke="#7191a3" stroke-width="1.5"/>
  <path :d="area" fill="#6cdbed" fill-opacity=".12"/>
  <path :d="curve" fill="none" stroke="#6cdbed" stroke-width="2.5"/>
  <text v-for="c in candidates" :key="c.label" :x="c.chart" y="296" text-anchor="middle" fill="#6cdbed" style="font-size:20px">{{c.label}}</text>
  <text x="560" y="359" text-anchor="middle" fill="#deebf2" style="font-size:23px">Plusieurs poses plausibles.</text>
 </svg>
</div>
</template>
<style scoped>
.matching-uncertainty{height:446px;padding:18px 12px}
.matching-uncertainty>svg{display:block;width:100%;height:100%}
</style>
