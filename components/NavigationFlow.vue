<script setup>
import { computed } from 'vue'
import { useTimeline,ramp } from '../composables/useTimeline'
import { buildings, scannerPose, scanAngle, castRay, pointPaths, navigationRoute, localPlan } from '../lib/navigation-lidar'
const {time,opacity,staticMode}=useTimeline(20,13)
const pose=computed(()=>scannerPose(time.value))
const cloud=computed(()=>pointPaths(time.value))
const plan=computed(()=>localPlan(time.value))
const sweep=computed(()=>{
  const origin=scannerPose(time.value),angle=scanAngle(time.value)
  const rays=Array.from({length:11},(_,i)=>castRay(origin,angle-(10-i)*.027))
  return {origin,head:rays.at(-1),rays,fan:`M${origin.x} ${origin.y} ${rays.map(p=>`L${p.x} ${p.y}`).join(' ')}Z`}
})
</script>
<template>
  <div class="motion-scene scientific-scene" :data-time="time" :data-static="staticMode">
    <svg viewBox="0 0 850 445" role="img" aria-label="Le véhicule cartographie et se localise en continu avec un lidar rotatif. Une courte trajectoire verte est recalculée devant lui dès le départ et avance avec lui.">
      <defs>
        <pattern id="nav-grid" width="25" height="25" patternUnits="userSpaceOnUse"><path d="M25 0H0V25" fill="none" stroke="#7395aa" stroke-opacity=".07"/></pattern>
        <radialGradient id="nav-glow"><stop stop-color="#6cdbed" stop-opacity=".35"/><stop offset="1" stop-color="#6cdbed" stop-opacity="0"/></radialGradient>
      </defs>
      <g :style="{opacity}">
        <rect width="850" height="420" fill="url(#nav-grid)"/>
        <!-- Physical context is muted; measured points remain in world coordinates. -->
        <path d="M40 230H810 M290 45V405 M515 45V405" stroke="#1d3546" stroke-width="62"/>
        <path d="M40 230H810 M290 45V405 M515 45V405" fill="none" stroke="#718c9c" stroke-opacity=".22" stroke-width="1" stroke-dasharray="10 12"/>
        <g v-for="(b,i) in buildings" :key="i">
          <rect :x="b[0]+5" :y="b[1]+8" :width="b[2]" :height="b[3]" rx="5" fill="#030d18"/>
          <rect :x="b[0]" :y="b[1]" :width="b[2]" :height="b[3]" rx="3" fill="#1b3040" stroke="#385165" stroke-width="1"/>
          <path :d="`M${b[0]+12} ${b[1]+14}H${b[0]+b[2]-12}`" stroke="#486174" stroke-opacity=".45"/>
        </g>
        <path :d="cloud.road" fill="none" stroke="#61b7c6" stroke-opacity=".65" stroke-width="2.5" stroke-linecap="round"/>
        <path :d="cloud.facade" fill="none" stroke="#b3f5f3" stroke-width="3.6" stroke-linecap="round"/>
        <g data-lidar="continuous">
          <path :d="sweep.fan" fill="#7edfe9" fill-opacity=".13"/>
          <line v-for="(hit,i) in sweep.rays" :key="i" :x1="sweep.origin.x" :y1="sweep.origin.y" :x2="hit.x" :y2="hit.y" stroke="#78ddea" :stroke-opacity=".06+i*.017" stroke-width="1"/>
          <line :x1="sweep.origin.x" :y1="sweep.origin.y" :x2="sweep.head.x" :y2="sweep.head.y" stroke="#c9ffff" stroke-width="1.8"/>
          <circle v-if="sweep.head.facade" :cx="sweep.head.x" :cy="sweep.head.y" r="4" fill="#e1ffff"/>
          <circle :cx="sweep.origin.x" :cy="sweep.origin.y" r="34" fill="none" stroke="#7fe3ed" stroke-opacity=".25"/>
          <path :d="`M${sweep.origin.x+31} ${sweep.origin.y-12}a34 34 0 0 1 1 22`" fill="none" stroke="#8eeaf1" stroke-width="2"/>
        </g>
        <g :transform="`translate(${pose.x},${pose.y}) rotate(${pose.angle})`">
          <ellipse :rx="39-8*ramp(time,0,4)" :ry="25-6*ramp(time,0,4)" fill="url(#nav-glow)" stroke="#6cdbed" stroke-opacity=".7" stroke-dasharray="3 5"/>
        </g>
        <path :d="navigationRoute.d" data-route="navigation" fill="none" stroke="none"/>
        <path :d="plan" data-local-plan="navigation" fill="none" stroke="#b4da83" stroke-width="6" stroke-linecap="round"/>
        <g data-vehicle="navigation" :transform="`translate(${pose.x},${pose.y}) rotate(${pose.angle})`">
          <circle r="27" fill="#6cdbed" fill-opacity=".1"/>
          <rect x="-21" y="-11" width="42" height="22" rx="7" fill="#e8f0f4"/>
          <path d="M-7-9V9M11-9V9" stroke="#153847" stroke-width="5"/>
          <circle r="6" fill="#123847" stroke="#c8fbff" stroke-width="1.5"/>
          <path d="M0 0H6" stroke="#95f5ff" stroke-width="2" :transform="`rotate(${(scanAngle(time)*180/Math.PI)-pose.angle})`"/>
        </g>
        <g><circle cx="515" cy="65" r="12" fill="#b4da83"/><text x="552" y="67" fill="#c6e4ab" style="font-size:20px"></text></g>
      </g>
    </svg>
    <MotionCaption :time="time" simultaneous :labels="['Cartographier','Se localiser','Planifier']"/>
  </div>
</template>
