import { roundedRoute } from './motion.js'
export const swarmPaths=[
 [[-6,3],[-3,3],[-3,-3],[2,-3]],
 [[2,-3],[6,-3],[6,3],[2,3]],
 // Go around the southern row of blocks, with room for the whole car at each bend.
 [[-3,2.6],[3.7,2.6],[3.7,5.5],[6,5.5],[6,3]],
]
export const swarmRoutes=swarmPaths.map(p=>roundedRoute(p,.55))
export const swarmBlocks=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>({x:[-5,4,1][i]+(j-1)*1.1,z:[-1,-1,4][i],width:.82,depth:.87})))
export function swarmTransform(i,aligned){return{x:[-1.2,1.2,.5][i]*(1-aligned),z:[.7,-1.1,1][i]*(1-aligned),angle:[-.14,.18,-.12][i]*(1-aligned)}}
