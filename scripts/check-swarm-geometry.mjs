import assert from 'node:assert/strict'
import {swarmRoutes,swarmBlocks,swarmTransform} from '../lib/swarm-geometry.js'
import {roundedRoute} from '../lib/motion.js'
const ease=x=>{x=Math.max(0,Math.min(1,x));return x*x*(3-2*x)}
const world=(p,g)=>({x:g.x+Math.cos(g.angle)*p.x+Math.sin(g.angle)*p.z,z:g.z-Math.sin(g.angle)*p.x+Math.cos(g.angle)*p.z})
function rectangle(p,hx,hz,angle){const c=Math.cos(angle),s=Math.sin(angle);return[[-hx,-hz],[hx,-hz],[hx,hz],[-hx,hz]].map(([x,z])=>({x:p.x+c*x+s*z,z:p.z-s*x+c*z}))}
function separation(a,b){let gap=-Infinity;for(const poly of[a,b])for(let i=0;i<4;i++){const p=poly[i],q=poly[(i+1)%4],dx=q.x-p.x,dz=q.z-p.z,n=Math.hypot(dx,dz),axis={x:-dz/n,z:dx/n},project=ps=>ps.map(p=>p.x*axis.x+p.z*axis.z),aa=project(a),bb=project(b);gap=Math.max(gap,Math.min(...bb)-Math.max(...aa),Math.min(...aa)-Math.max(...bb))}return gap}
function check(routes){let min=Infinity,at=null,hits=0;for(let frame=0;frame<=2400;frame++){const t=frame/120,aligned=ease((t-8)/4),travel=ease((t-1)/5)*.7,groups=[0,1,2].map(i=>swarmTransform(i,aligned));for(let i=0;i<3;i++){const p=routes[i].pose(travel),g=groups[i],car=rectangle(world({x:p.x,z:p.y},g),.655,.395,g.angle-p.angle*Math.PI/180);for(let j=0;j<3;j++)for(const block of swarmBlocks[j]){const shape=rectangle(world(block,groups[j]),block.width/2,block.depth/2,groups[j].angle),gap=separation(car,shape);if(gap<min){min=gap;at={t,car:i,blockGroup:j,block}}if(gap<0)hits++}}}return{min,at,hits}}
// Verify that the regression check actually catches the reported old route.
const old=[...swarmRoutes];old[2]=roundedRoute([[-3,3],[1,3],[1,5],[6,5],[6,3]],.55)
assert(check(old).hits>0,'The old orange path should fail this check')
const result=check(swarmRoutes);console.log(JSON.stringify(result,null,2));assert.equal(result.hits,0,'A moving vehicle overlaps a mapped block')
