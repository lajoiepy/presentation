// Top-down rotating LiDAR: facade rays stop at the first wall, while lower
// channels sample the visible road surface. All samples have absolute times.
import { roundedRoute } from './motion.js'
export const buildings = [[110,90,150,92],[325,90,155,92],[545,90,165,92],[110,280,150,92],[325,280,155,92],[545,280,165,92]]
export const scanStart = 0, scanEnd = 20, rotationPeriod = 1.85
export const navigationRoute = roundedRoute([[100,230],[515,230],[515,65]],25)
const ease = t => { const x = Math.max(0, Math.min(1, t)); return x*x*(3-2*x) }
export const routeProgress = t => ease(t/18.8)
export const scannerPose = t => navigationRoute.pose(routeProgress(t))
export const scanAngle = t => (t-scanStart)/rotationPeriod*Math.PI*2 - Math.PI/2
// Recompute a short horizon from the vehicle's current pose, never the whole trip.
export function localPlan(t) {
  const start=routeProgress(t)*navigationRoute.length
  const horizon=70+12*Math.sin(t*Math.PI/2)
  const end=Math.min(navigationRoute.length,start+horizon)
  if(end-start<2)return ''
  return Array.from({length:25},(_,i)=>{
    const p=navigationRoute.pose((start+(end-start)*i/24)/navigationRoute.length)
    return `${i?'L':'M'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`
  }).join(' ')
}
export const onRoad = (x,y) => (x>=40&&x<=810&&y>=199&&y<=261) || (y>=45&&y<=405&&((x>=259&&x<=321)||(x>=484&&x<=546)))

export function castRay(origin, angle, range=390) {
  const dx=Math.cos(angle), dy=Math.sin(angle)
  let distance=range, facade=false
  for (const [edge,offset] of [[dx,810-origin.x],[-dx,origin.x-40],[dy,405-origin.y],[-dy,origin.y-45]])
    if(edge>1e-8) distance=Math.min(distance,offset/edge)
  for(const [x,y,w,h] of buildings) {
    let enter=-Infinity, exit=Infinity
    for(const [o,d,lo,hi] of [[origin.x,dx,x,x+w],[origin.y,dy,y,y+h]]) {
      if(Math.abs(d)<1e-8) { if(o<lo||o>hi) { enter=Infinity; break } }
      else { const a=(lo-o)/d,b=(hi-o)/d; enter=Math.max(enter,Math.min(a,b));exit=Math.min(exit,Math.max(a,b)) }
    }
    if(enter>=0&&enter<=exit&&enter<distance) { distance=enter;facade=true }
  }
  return {x:origin.x+dx*distance,y:origin.y+dy*distance,distance,facade}
}

const dot = p => `M${p.x.toFixed(1)} ${p.y.toFixed(1)}h.1`
export const returns = Array.from({length:650},(_,i)=> {
  const t=scanStart+(scanEnd-scanStart)*i/649,origin=scannerPose(t),angle=scanAngle(t),hit=castRay(origin,angle)
  const road=[]
  for(const distance of [26,43,65,91,123,161,205,255,310]) {
    const x=origin.x+Math.cos(angle)*distance,y=origin.y+Math.sin(angle)*distance
    if(distance<hit.distance-2&&onRoad(x,y)) road.push({x,y})
  }
  return {t,hit,road,roadPath:road.map(dot).join(''),facadePath:hit.facade?dot(hit):''}
})

export function pointPaths(t) {
  let road='',facade=''
  for(const sample of returns) {
    if(sample.t>t) break
    road+=sample.roadPath
    facade+=sample.facadePath
  }
  return {road,facade}
}
