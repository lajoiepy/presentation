import assert from 'node:assert/strict'
import {fleetSpecs,fleetPose,fleetScale} from '../lib/fleet-geometry.js'
const hx=.655*fleetScale,hz=.395*fleetScale,dt=1/120
let minGap=Infinity
for(let frame=0;frame<=2400;frame++){
 const t=frame*dt,poses=fleetSpecs.map((_,i)=>fleetPose(i,t))
 poses.forEach((p,i)=>{
  assert(p.z-hz>=-2.1&&p.z+hz<=1.1,'Vehicle leaves the road or reaches a building')
  assert(Math.abs(p.x)+hx<=9.01,'Vehicle exceeds the road platform')
  const next=fleetPose(i,t+dt),dx=Math.abs(next.x-p.x)
  if(dx<1)assert(Math.abs(dx/dt-.9)<1e-8,'Vehicle stops or changes speed')
  else assert(p.opacity<.01&&next.opacity<.01,'Visible teleport at road edge')
  poses.slice(i+1).forEach(q=>{const gap=Math.max(Math.abs(p.x-q.x)-2*hx,Math.abs(p.z-q.z)-2*hz);minGap=Math.min(minGap,gap);assert(gap>0,'Vehicle footprints overlap')})
 })
}
console.log(`Fleet: four moving vehicles, no collisions; minimum gap ${minGap.toFixed(3)}`)
