<script setup>
import { assetUrl } from '../lib/asset-url'
import { useTimeline,ramp } from '../composables/useTimeline'
const {time,opacity,staticMode}=useTimeline(20,17)
// Real photo and OSM crop from sample 403. The two headings are illustrative,
// not the model's measured pose hypotheses; no original pixels are modified.
const source=assetUrl('media/reliability/semantic-example.png')
</script>
<template><div class="motion-scene scientific-scene" :data-time="time" :data-static="staticMode"><svg viewBox="0 0 700 450" role="img" aria-label="Photo réelle : façade à gauche, végétation à droite. Sur un extrait de sa carte OSM, deux orientations illustratives sont comparées. Le sens A inverse ces côtés, le sens B les respecte, sans prouver la position."><g :style="{opacity}">
 <text x="22" y="32" fill="#d4e4ec" style="font-size:20px"></text>
 <text x="372" y="32" fill="#d4e4ec" style="font-size:20px">Deux orientations à tester</text>
 <svg x="22" y="52" width="306" height="280" viewBox="57 170 379 347" style="overflow:hidden">
  <image :href="source" width="1967" height="1172"/>
  <g :style="{opacity:ramp(time,3,5)}" fill="none" stroke-width="3">
   <path d="M62 176H174L235 345L79 375Z" stroke="#6cdbed"/>
   <path d="M301 251L431 183V369L254 366Z" stroke="#b4da83"/>
  </g>
 </svg>
 <g :style="{opacity:ramp(time,3,5)}">
  <circle cx="30" cy="356" r="5" fill="#6cdbed"/><text x="44" y="362" fill="#6cdbed" style="font-size:19px">Façade à gauche</text>
  <circle cx="30" cy="385" r="5" fill="#b4da83"/><text x="44" y="391" fill="#b4da83" style="font-size:19px">Végétation à droite</text>
 </g>
 <g v-for="(y,i) in [52,222]" :key="i">
  <rect x="372" :y="y" width="307" height="125" rx="7" fill="#112b3e" :stroke="time>=(i?11:7)?(i?'#b4da83':'#ff987f'):'#4b6d81'" stroke-width="2"/>
  <text x="385" :y="y+23" fill="#e3edf2" style="font-size:19px">Sens {{i?'B':'A'}} · {{i?'vers le bas':'vers le haut'}}</text>
  <!-- Marker-free crop of the original raster map; geographic content is unchanged. -->
  <svg x="384" :y="y+32" width="285" height="85" viewBox="640 365 285 85" style="overflow:hidden"><image :href="source" width="1967" height="1172"/></svg>
  <g :transform="`translate(547 ${y+76}) rotate(${i?-14:166})`">
   <path d="M0-23V20M-8 10L0 20L8 10" fill="none" stroke="#092434" stroke-width="8" stroke-linejoin="round"/>
   <path d="M0-23V20M-8 10L0 20L8 10" fill="none" stroke="#fff" stroke-width="4" stroke-linejoin="round"/>
  </g>
  <g :style="{opacity:ramp(time,i?11:7,i?13:9)}">
   <circle cx="651" :cy="y+19" r="12" fill="#102938"/>
   <text x="651" :y="y+25" text-anchor="middle" :fill="i?'#b4da83':'#ff987f'" style="font-size:22px">{{i?'✓':'×'}}</text>
   <text x="383" :y="y+149" :fill="i?'#b4da83':'#ff987f'" style="font-size:18px">{{i?'Côtés compatibles avec la photo':'Gauche et droite sont inversées'}}</text>
  </g>
 </g>
 <text x="372" y="392" fill="#b9ccda" style="font-size:14px">Bleu : bâtiments · vert : végétation</text>
 <text x="350" y="432" text-anchor="middle" fill="#d6e6ed" style="font-size:20px">{{time<7?'Quels indices confronter à la carte ?':time<11?'Le sens de vue change les côtés attendus.':'Des côtés compatibles ne prouvent pas la position.'}}</text>
 </g></svg><MotionCaption :time="time" :starts="[0,3,7,11]" :labels="['Observer','Repérer les indices','Tester le sens A','Tester le sens B']"/></div></template>
