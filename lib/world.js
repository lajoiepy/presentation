import * as T from 'three'
import { swarmRoutes,swarmBlocks,swarmTransform } from './swarm-geometry'
import { fleetSpecs,fleetPose,fleetScale } from './fleet-geometry'
import { ramp } from '../composables/useTimeline'
export const palette={cyan:0x6cdbed,orange:0xffae75,green:0xb4da83,base:0x17394a}
function material(color,extra={}){return new T.MeshStandardMaterial({color,roughness:.83,metalness:.05,...extra})}
export function box(parent,x,y,z,w,h,d,color){const m=new T.Mesh(new T.BoxGeometry(w,h,d),material(color));m.position.set(x,y,z);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m}
function line(parent,points,color,width=1){const g=new T.BufferGeometry().setFromPoints(points.map(p=>new T.Vector3(...p)));const l=new T.Line(g,new T.LineBasicMaterial({color,transparent:true,opacity:width}));parent.add(l);return l}
function ring(parent,r,color){const m=new T.Mesh(new T.RingGeometry(r-.045,r+.045,80),new T.MeshBasicMaterial({color,transparent:true,opacity:.9,side:T.DoubleSide}));m.rotation.x=-Math.PI/2;parent.add(m);return m}
function rod(parent,a,b,color,r=.025){const start=new T.Vector3(...a),end=new T.Vector3(...b),delta=end.clone().sub(start);const m=new T.Mesh(new T.CylinderGeometry(r,r,delta.length(),8),new T.MeshBasicMaterial({color,toneMapped:false}));m.position.copy(start).add(end).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize());parent.add(m);return m}
function wireBox(parent,x,y,z,w,h,d,color){const e=new T.EdgesGeometry(new T.BoxGeometry(w,h,d)),a=e.attributes.position;for(let i=0;i<a.count;i+=2)rod(parent,[a.getX(i)+x,a.getY(i)+y,a.getZ(i)+z],[a.getX(i+1)+x,a.getY(i+1)+y,a.getZ(i+1)+z],color,.025);e.dispose()}
export function car(parent,color=palette.cyan,bus=false){const g=new T.Group();parent.add(g);box(g,0,.3,0,bus?2.6:1.25,.4,.64,color);box(g,bus?-.1:-.05,.61,0,bus?2.2:.62,bus?.5:.3,.55,color);box(g,0,.63,.283,bus?2.05:.48,.2,.018,0x183447);box(g,0,.63,-.283,bus?2.05:.48,.2,.018,0x183447);for(const x of [bus?-.9:-.39,bus?.9:.39])for(const z of [-.34,.34]){const w=new T.Mesh(new T.CylinderGeometry(.17,.17,.11,14),material(0x091321));w.rotation.x=Math.PI/2;w.position.set(x,.19,z);g.add(w)}for(const z of [-.21,.21])box(g,bus?1.31:.635,.32,z,.025,.12,.13,0xffe9b0);return g}
export const buildings=[[-6,-4.4,3.3,3.1,2.4],[-2,-4.4,2.6,3.1,3.7],[4,-4.4,4.7,3.1,2.9],[-6,3.7,3.3,2.6,3],[-2,3.7,2.6,2.6,1.6],[3,3.7,2.7,2.6,2.1],[6.2,3.7,2.2,2.6,3.3]]
export function cityWorld(scene){
 const world=new T.Group();scene.add(world);box(world,0,-.3,0,18,.45,14,0x0e2635);box(world,0,-.02,-.5,18,.1,3.2,0x2b4050);box(world,.5,-.01,0,2.7,.11,14,0x2b4050)
 for(let x=-8;x<=8;x+=1.3)if(Math.abs(x-.5)>1.8)box(world,x,.06,-.5,.65,.015,.06,0x80939c)
 for(let z=-6;z<7;z+=1.2)if(Math.abs(z+.5)>2)box(world,.5,.06,z,.06,.015,.5,0x80939c)
 for(let i=0;i<6;i++)box(world,-1.3+i*.33,.08,1.52,.18,.018,.8,0xbbc9cc)
 const roofs=[]
 buildings.forEach(([x,z,w,d,h],i)=>{box(world,x,-.04,z,w+.4,.25,d+.4,0x46606a);const building=new T.Group();world.add(building);box(building,x,h/2,z,w,h,d,i%2?0x345866:0x274a60);roofs.push(building);box(building,x,h+.04,z,w+.12,.1,d+.12,0x557680);for(let y=.7;y<h-.2;y+=.65)for(let xx=x-w/2+.4;xx<x+w/2-.15;xx+=.6)box(building,xx,y,z+d/2+.01,.22,.24,.02,0x7f9fa7)})
 for(const [x,z] of [[-8,3],[-8,4.5],[7.8,-4],[7.8,-5.5],[3,6],[5,6]]){box(world,x,.35,z,.11,.7,.11,0x5b5444);const tree=new T.Mesh(new T.IcosahedronGeometry(.56,1),material(0x477664));tree.position.set(x,1,z);world.add(tree)}
 // A pedestrian and a bicycle place the localization problem in a shared urban space.
 for(const [x,z] of [[-1.6,1.8],[2.2,-2.3]]){const head=new T.Mesh(new T.SphereGeometry(.12,12,8),material(0xffbe91));head.position.set(x,.85,z);world.add(head);box(world,x,.53,z,.22,.42,.16,0xe5b381);for(const dx of [-.07,.07])box(world,x+dx,.2,z,.06,.3,.07,0x9db2bd)}
 const bike=new T.Group();world.add(bike);bike.position.set(-4,.2,1.1);for(const x of [-.3,.3]){const w=ring(bike,.23,0xa5c4cf);w.rotation.set(0,0,0);w.position.x=x}line(bike,[[-.3,0,0],[0,.4,0],[.3,0,0],[-.3,0,0]],0x86b3bf)
 return {world,roofs}
}
function makeFleetCity(scene){
 const {world}=cityWorld(scene)
 const footprints=new T.Group();world.add(footprints)
 buildings.forEach(([x,z,w,d])=>line(footprints,[[x-w/2,.14,z-d/2],[x+w/2,.14,z-d/2],[x+w/2,.14,z+d/2],[x-w/2,.14,z+d/2],[x-w/2,.14,z-d/2]],palette.cyan))
 const fleet=fleetSpecs.map(()=>{
  const vehicle=car(world,0xe8f0f4);vehicle.scale.setScalar(fleetScale)
  const materials=[];vehicle.traverse(o=>{if(o.material){o.material.transparent=true;materials.push(o.material)}})
  const estimate=new T.Group();world.add(estimate);const region=ring(estimate,.82,palette.cyan);region.scale.set(1.3,1,1)
  line(estimate,[[-.2,.04,0],[.2,.04,0]],palette.cyan);line(estimate,[[0,.04,-.2],[0,.04,.2]],palette.cyan)
  const rays=[0,1].map(()=>{const m=new T.Mesh(new T.CylinderGeometry(.025,.025,1,8),new T.MeshBasicMaterial({color:palette.cyan,toneMapped:false,transparent:true,depthWrite:false}));world.add(m);return m})
  const markers=[0,1].map(()=>{const m=ring(world,.17,palette.cyan);m.position.y=.17;return m})
  return {vehicle,materials,estimate,rays,markers}
 })
 return t=>{
  const observe=ramp(t,7,9),align=ramp(t,11,14)
  footprints.traverse(o=>{if(o.material){o.material.opacity=.9*align;o.material.toneMapped=false}})
  fleet.forEach(({vehicle,materials,estimate,rays,markers},i)=>{
   const p=fleetPose(i,t)
   vehicle.position.set(p.x,0,p.z);vehicle.rotation.y=p.angle;vehicle.visible=p.opacity>0
   materials.forEach(m=>m.opacity=p.opacity)
   // The moving estimate is corrected by map evidence, but retains a residual error.
   estimate.position.set(p.x+p.direction*(.95+.12*Math.sin(t*.6+i))*(1-.86*align),.13,p.z+(.52+.09*Math.cos(t*.4+i))*(1-.86*align))
   estimate.scale.setScalar(1-.58*align);estimate.traverse(o=>{if(o.material)o.material.opacity=.85*p.opacity})
   const visibleCorners=buildings.filter(b=>p.direction===1?b[1]>0:b[1]<0).flatMap(([x,z,w,d])=>[-1,1].map(side=>({x:x+side*w/2,z:z-Math.sign(z)*d/2}))).sort((a,b)=>Math.hypot(a.x-p.x,a.z-p.z)-Math.hypot(b.x-p.x,b.z-p.z))
   rays.forEach((ray,j)=>{
    const target=visibleCorners[j],a=new T.Vector3(p.x,.7,p.z),b=new T.Vector3(target.x,.17,target.z),delta=b.clone().sub(a)
    ray.position.copy(a).add(b).multiplyScalar(.5);ray.scale.y=delta.length();ray.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),delta.normalize())
    ray.material.opacity=.8*observe*p.opacity;markers[j].position.set(target.x,.17,target.z);markers[j].material.opacity=.8*observe*p.opacity
   })
  })
 }
}
export function makeCity(scene,kind){
 if(kind==='adas')return makeFleetCity(scene)
 const {world,roofs}=cityWorld(scene),vehicle=car(world,['intro','adas'].includes(kind)?0xe8f0f4:palette.cyan),bus=car(world,0xa3bc85,true);bus.position.set(5,0,-1.15)
 const gps=new T.Group();world.add(gps);const outer=ring(gps,1.45,palette.cyan);outer.scale.set(1.5,1,1);line(gps,[[-.23,.12,0],[.23,.12,0]],palette.cyan);line(gps,[[0,.12,-.23],[0,.12,.23]],palette.cyan)
 const beamGeo=new T.BufferGeometry().setFromPoints([new T.Vector3(0,.1,0),new T.Vector3(5,.1,-3.6),new T.Vector3(5,.1,2.7)]);beamGeo.setIndex([0,1,2]);const beam=new T.Mesh(beamGeo,new T.MeshBasicMaterial({color:palette.cyan,transparent:true,opacity:.16,side:T.DoubleSide,depthWrite:false}));world.add(beam)
 const footprints=new T.Group();world.add(footprints);buildings.forEach(([x,z,w,d])=>line(footprints,[[x-w/2,.14,z-d/2],[x+w/2,.14,z-d/2],[x+w/2,.14,z+d/2],[x-w/2,.14,z+d/2],[x-w/2,.14,z-d/2]],palette.cyan))
 const changed=new T.Group();world.add(changed);const [x,z,w,d,h]=buildings[5];const edges=new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(w,h,d)),new T.LineDashedMaterial({color:palette.orange,dashSize:.2,gapSize:.13}));edges.computeLineDistances();edges.position.set(x,h/2+.03,z);wireBox(changed,x,h/2+.03,z,w+.05,h+.06,d+.05,palette.orange);edges.geometry.dispose();edges.material.dispose()
 const landmarks=new T.Group();world.add(landmarks);for(const i of [2,5]){const [bx,bz,bw,bd,bh]=buildings[i];wireBox(landmarks,bx,bh/2+.04,bz,bw+.04,bh+.08,bd+.04,palette.cyan);rod(landmarks,[-3,.7,.25],[bx-bw/2,bh,bz+(bz<0?bd/2:-bd/2)],palette.cyan,.016)}
 const network=new T.Group();world.add(network);const points=[[-3,.6,.25],[.5,4,-4.4],[6.2,3.5,3.7]];const packets=[];for(let i=0;i<3;i++){const a=new T.Vector3(...points[i]),b=new T.Vector3(...points[(i+1)%3]);line(network,[a.toArray(),b.toArray()],palette.cyan,.35);const ball=new T.Mesh(new T.SphereGeometry(.09,12,8),new T.MeshBasicMaterial({color:palette.cyan}));network.add(ball);packets.push({ball,a,b})}
 return (t)=>{
  const move=ramp(t,1,6),drift=ramp(t,4,8),align=ramp(t,11,14)
  vehicle.position.set(-6+move*3,0,.25);gps.position.set(vehicle.position.x+1.8*drift*(kind==='adas'?1-align:1),.13,.25-1.5*drift*(kind==='adas'?1-align:1));gps.visible=['intro','adas'].includes(kind);gps.scale.setScalar(kind==='adas'?1-.72*align:1)
  beam.position.copy(vehicle.position);beam.visible=kind==='adas'?t>7:kind==='conditions';beam.material.opacity=kind==='adas'?.17*ramp(t,7,9):.12
  landmarks.visible=kind==='adas'&&t>7;landmarks.scale.y=.2+.8*ramp(t,7,9);footprints.visible=kind==='adas';footprints.scale.y=1;footprints.traverse(o=>{if(o.material)o.material.opacity=ramp(t,10,12)})
  bus.position.x=kind==='conditions'?5-7*ramp(t,1,4)+11*ramp(t,5,7):5;bus.position.z=kind==='conditions'?.25:-1.15
  const night=kind==='conditions'?ramp(t,6,8)*(1-ramp(t,12,14)):0
  beam.material.color.setHex(night>.5?0xffe4a0:palette.cyan);scene.userData.sun.intensity=2.3-night*1.9;scene.userData.ambient.intensity=2-night*1.45
  changed.visible=kind==='conditions'&&t>13;roofs[5].scale.y=1-(kind==='conditions'?.82*ramp(t,13,15):0);const footprint=1-(kind==='conditions'?.6*ramp(t,13,15):0);roofs[5].scale.x=roofs[5].scale.z=footprint;roofs[5].position.x=buildings[5][0]*(1-footprint);roofs[5].position.z=buildings[5][1]*(1-footprint)
  network.visible=kind==='questions';packets.forEach(({ball,a,b},i)=>ball.position.lerpVectors(a,b,((t+i*1.2)%4)/4))
 }
}
export function makeSwarm(scene){
 const colors=[palette.cyan,palette.green,palette.orange],groups=[],robots=[],trails=[],correspondences=[]
 const floor=box(scene,0,-.3,0,19,.35,14,0x102735)
 for(let i=0;i<3;i++){
  const g=new T.Group();scene.add(g);groups.push(g)
  const route=swarmRoutes[i];trails.push({route,line:line(g,Array.from({length:201},(_,j)=>{const p=route.pose(j/200);return[p.x,.15,p.y]}),colors[i])})
  const r=car(g,colors[i]);robots.push(r)
  for(const {x,z} of swarmBlocks[i]){box(g,x,.5,z,.8,1,.85,0x264756);const e=new T.LineSegments(new T.EdgesGeometry(new T.BoxGeometry(.82,1.03,.87)),new T.LineBasicMaterial({color:colors[i],transparent:true,opacity:.65}));e.position.set(x,.5,z);g.add(e)}
  const common=i===0?[[2,-3]]:i===1?[[2,-3],[6,3]]:[[6,3]];for(const [cx,cz] of common){const marker=ring(g,.48,0xf6d6a0);marker.position.set(cx,.18,cz);correspondences.push(marker)}
 }
 const links=new T.Group();scene.add(links);const loc=[[-3,.65,-1],[6,.65,0],[1,.65,4]];const particles=[]
 for(const [a,b] of [[0,1],[1,2],[0,2]]){const l=line(links,[loc[a],loc[b]],0xf6d6a0,.6);const m=new T.Mesh(new T.SphereGeometry(.13,10,8),new T.MeshBasicMaterial({color:0xf6d6a0}));links.add(m);particles.push({l,m,ai:a,bi:b,a:new T.Vector3(...loc[a]),b:new T.Vector3(...loc[b])})}
 return t=>{
  const aligned=ramp(t,8,12),travel=ramp(t,1,6)
  groups.forEach((g,i)=>{const transform=swarmTransform(i,aligned);g.position.set(transform.x,0,transform.z);g.rotation.y=transform.angle;const p=trails[i].route.pose(travel*.7);robots[i].position.set(p.x,.15,p.y);robots[i].rotation.y=-p.angle*Math.PI/180;trails[i].line.geometry.setDrawRange(0,Math.max(2,Math.ceil(201*travel*.7)))})
  correspondences.forEach(m=>{m.visible=t>5;m.material.opacity=ramp(t,5,6)});scene.updateMatrixWorld(true);links.visible=t>12;particles.forEach(({l,m,a,b,ai,bi},i)=>{robots[ai].getWorldPosition(a);robots[bi].getWorldPosition(b);a.y=.75;b.y=.75;const positions=l.geometry.attributes.position;positions.setXYZ(0,a.x,a.y,a.z);positions.setXYZ(1,b.x,b.y,b.z);positions.needsUpdate=true;l.geometry.computeBoundingSphere();l.visible=i<2||t<14;m.visible=i<2&&t>14;m.position.lerpVectors(a,b,((t-14+i*.8)%2+2)%2/2);l.material.opacity=i===2?.45*(1-ramp(t,13,15)):.55})
 }
}
