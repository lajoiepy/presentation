<script setup>
import { computed } from 'vue'
import { useTimeline,ramp } from '../composables/useTimeline'
const {time,opacity,staticMode}=useTimeline(20,18)
// Map only the triangular feature panel into a camera-centred footprint.
const featureMatrix=`matrix(${65/119} ${-100/119} ${65/69} ${100/69} ${-46*65/119-530*65/69} ${46*100/119-530*100/69})`
const lift=computed(()=>ramp(time.value,3,6))
const encode=computed(()=>ramp(time.value,7,10))
const match=computed(()=>ramp(time.value,11,12))
// Candidate poses illustrate the search; these are not predictions from the paper.
const poses=[[105,152,-25],[165,118,20],[142,171,-12],[126,146,0]]
const pose=computed(()=>{
 const s=Math.min(2.999,Math.max(0,(time.value-12)/1.7)),i=Math.floor(s),f=ramp(s-i,0,1)
 return poses[i].map((v,j)=>v+(poses[i+1][j]-v)*f)
})
const gridPoint=(u,v)=>{
 const q=lift.value
 return [(1-q)*(75+70*u+(u-.5)*100*v)+q*(20+180*u),(1-q)*(48+125*v)+q*(20+153*v)]
}
const gridLine=(a,b)=>{const p=gridPoint(...a),q=gridPoint(...b);return `M${p[0]} ${p[1]}L${q[0]} ${q[1]}`}
const caption=computed(()=>time.value<3?'Une image seule ne donne pas directement sa position.':time.value<7?'Le réseau apprend une représentation vue du dessus.':time.value<11?'La carte publique est encodée dans un espace comparable.':time.value<17.1?'On compare plusieurs positions et orientations.':'L’appariement propose une pose ; sa fiabilité reste à évaluer.')
</script>
<template><div class="motion-scene localization-pipeline" :data-time="time" :data-static="staticMode">
<svg viewBox="0 0 1120 420" role="img" aria-label="Image caméra vers représentation BEV apprise ; carte publique vers carte neuronale ; comparaison des deux représentations en position et orientation.">
<defs>
 <clipPath id="pipeline-bev-patch"><path d="M0 0L-65-100H65Z"/></clipPath>
 <g id="pipeline-feature" clip-path="url(#pipeline-bev-patch)"><image href="/media/orienternet-architecture.png" width="600" height="630" :transform="featureMatrix"/></g>
 <clipPath id="pipeline-match-box"><rect x="810" y="78" width="260" height="260" rx="6"/></clipPath>
</defs>
<g :style="{opacity}">
 <!-- Two independent inputs, joined only for matching. -->
 <g v-for="(p,i) in [[24,32,'01','Image caméra'],[326,32,'02','Projection BEV'],[326,235,'03','Carte neuronale'],[798,32,'04','Appariement']]" :key="i">
  <text :x="p[0]" :y="p[1]" fill="#6cdbed" style="font-size:14px">{{p[2]}}</text>
  <text :x="p[0]+29" :y="p[1]" fill="#e1edf3" style="font-size:21px">{{p[3]}}</text>
 </g>
 <rect x="24" y="49" width="190" height="156" rx="7" fill="#102838" stroke="#6cdbed"/>
 <svg x="29" y="54" width="180" height="146" viewBox="60 80 111 111" preserveAspectRatio="xMidYMid slice" style="overflow:hidden"><image href="/media/orienternet-architecture.png" width="600" height="630"/></svg>
 <text x="24" y="235" fill="#c2d6e2" style="font-size:20px">Carte publique · OSM</text>
 <svg x="59" y="253" width="119" height="119" viewBox="216 243 137 137" preserveAspectRatio="xMidYMid meet" style="overflow:hidden"><image href="/media/orienternet-architecture.png" width="600" height="630"/></svg>
 <!-- The animated grid changes viewpoint; it is not a homography of the photo. -->
 <rect x="325" y="49" width="220" height="156" rx="7" fill="#112b3c" :stroke="time>=3?'#6cdbed':'#3b5c70'"/>
 <g transform="translate(325 43) scale(1 .9)" :style="{opacity:1-ramp(time,5.5,6.5)}">
  <path v-for="i in 7" :key="`h${i}`" :d="gridLine([0,(i-1)/6],[1,(i-1)/6])" stroke="#6cdbed" stroke-opacity=".65" fill="none"/>
  <path v-for="i in 7" :key="`v${i}`" :d="gridLine([(i-1)/6,0],[(i-1)/6,1])" stroke="#6cdbed" stroke-opacity=".65" fill="none"/>
 </g>
 <g :style="{opacity:ramp(time,5.5,6.5)}"><use href="#pipeline-feature" transform="translate(435 180) scale(1.1)"/><path d="M435 180L363.5 70H506.5Z" fill="none" stroke="#c3e4ef"/><text x="435" y="194" text-anchor="middle" fill="#bad8e3" style="font-size:14px">Caractéristiques vues du dessus</text></g>
 <rect x="325" y="248" width="220" height="128" rx="7" fill="#112b3c" :stroke="time>=7?'#b4da83':'#3b5c70'"/>
 <svg x="376" y="253" width="118" height="118" viewBox="215 438 136 136" preserveAspectRatio="xMidYMid meet" style="overflow:hidden" :style="{opacity:encode}"><image href="/media/orienternet-architecture.png" width="600" height="630"/></svg>
 <!-- Encoders: labels remain visible throughout the loop. -->
 <g v-for="(y,i) in [122,309]" :key="i" :style="{opacity:.3+.7*(i?encode:lift)}">
  <path :d="`M217 ${y}H316m-7-5 7 5-7 5`" fill="none" :stroke="i?'#b4da83':'#6cdbed'" stroke-width="2"/>
  <rect x="231" :y="y-30" width="70" height="22" rx="5" fill="#234253"/>
  <text x="266" :y="y-14" text-anchor="middle" fill="#dce7ed" style="font-size:13px">Réseau</text>
  <circle :cx="217+99*(i?encode:lift)" :cy="y" r="4" :fill="i?'#b4da83':'#6cdbed'"/>
 </g>
 <g :style="{opacity:.2+.8*match}">
  <path d="M554 122H620Q636 122 636 138V202H777m-8-6 8 6-8 6M554 309H620Q636 309 636 293V202" fill="none" stroke="#83cad6" stroke-width="2"/>
  <text x="650" y="178" fill="#bdceda" style="font-size:15px">Comparer</text>
  <text x="650" y="230" fill="#bdceda" style="font-size:15px">x, y et angle</text>
 </g>
 <rect x="798" y="49" width="284" height="327" rx="9" fill="#112b3c" :stroke="time>=11?'#6cdbed':'#3b5c70'"/>
 <g :style="{opacity:.18+.82*encode}"><svg x="810" y="78" width="260" height="260" viewBox="215 438 136 136" style="overflow:hidden"><image href="/media/orienternet-architecture.png" width="600" height="630"/></svg></g>
 <g clip-path="url(#pipeline-match-box)" :style="{opacity:match}"><g :transform="`translate(${810+pose[0]} ${78+pose[1]}) rotate(${pose[2]})`">
  <use href="#pipeline-feature" style="opacity:.82"/>
  <path d="M0 0L-65-100H65Z" fill="none" stroke="#f0faff" stroke-width="2.5"/>
  <circle r="5" fill="#fff" stroke="#17394a" stroke-width="2"/><path d="M0-6V-28m-5 7 5-7 5 7" stroke="#fff" fill="none" stroke-width="2.5"/>
 </g></g>
 <text x="940" y="67" text-anchor="middle" fill="#b4cdda" style="font-size:13px">BEV superposée à la carte neuronale</text>
 <text x="940" y="361" text-anchor="middle" :fill="time>=17.1?'#ffbd90':'#c7dbe5'" style="font-size:16px">{{time<11?'Deux représentations à comparer':time<17.1?'Translation + rotation':'Pose proposée · à vérifier'}}</text>
 <text x="550" y="405" text-anchor="middle" fill="#cfe3ed" style="font-size:19px">{{caption}}</text>
</g>
</svg>
<MotionCaption :time="time" :starts="[0,3,7,11]" :labels="['Image','Projection BEV','Extraction neuronale','Appariement']"/>
</div></template>
<style scoped>
.localization-pipeline{height:446px;padding:10px 12px 58px}
.localization-pipeline>svg{display:block;width:100%;height:100%}
</style>
