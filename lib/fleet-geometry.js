// Two vehicles per lane, constant speed; wrap only at the faded edge of the scene.
export const fleetSpecs=[
 {offset:1.4,z:.25,direction:1},
 {offset:9.7,z:.25,direction:1},
 {offset:4.1,z:-1.15,direction:-1},
 {offset:12.4,z:-1.15,direction:-1},
]
export const fleetScale=1.08
export function fleetPose(index,t){
 const {offset,z,direction}=fleetSpecs[index],progress=((offset+t*.9)%16.6+16.6)%16.6
 const x=direction*(progress-8.3),edge=Math.min(1,Math.max(0,(8.3-Math.abs(x))/.8))
 return {x,z,direction,angle:direction===1?0:Math.PI,opacity:edge*edge*(3-2*edge)}
}
