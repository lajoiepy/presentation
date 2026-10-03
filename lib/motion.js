// Sample one rounded route for both its SVG stroke and the vehicle pose.
// The lookup is based on distance, so speed and heading stay continuous at bends.
export function roundedRoute(vertices, radius=24) {
  const samples=[{x:vertices[0][0],y:vertices[0][1],angle:0,length:0}]
  let d=`M${vertices[0].join(' ')}`
  const push=(x,y,angle)=>{const prev=samples.at(-1);samples.push({x,y,angle,length:prev.length+Math.hypot(x-prev.x,y-prev.y)})}
  const lineTo=p=>{const a=samples.at(-1),angle=Math.atan2(p[1]-a.y,p[0]-a.x)*180/Math.PI;push(p[0],p[1],angle);d+=` L${p.join(' ')}`}
  for(let i=1;i<vertices.length-1;i++){
    const a=vertices[i-1],b=vertices[i],c=vertices[i+1]
    const before=Math.hypot(b[0]-a[0],b[1]-a[1]),after=Math.hypot(c[0]-b[0],c[1]-b[1])
    const r=Math.min(radius,before/2,after/2)
    const entry=[b[0]+(a[0]-b[0])*r/before,b[1]+(a[1]-b[1])*r/before]
    const out=[b[0]+(c[0]-b[0])*r/after,b[1]+(c[1]-b[1])*r/after]
    lineTo(entry);d+=` Q${b.join(' ')} ${out.join(' ')}`
    for(let j=1;j<=32;j++){const t=j/32,u=1-t;push(u*u*entry[0]+2*u*t*b[0]+t*t*out[0],u*u*entry[1]+2*u*t*b[1]+t*t*out[1],Math.atan2(u*(b[1]-entry[1])+t*(out[1]-b[1]),u*(b[0]-entry[0])+t*(out[0]-b[0]))*180/Math.PI)}
  }
  lineTo(vertices.at(-1));samples[0].angle=samples[1].angle
  const length=samples.at(-1).length
  return {d,length,pose(progress){const target=Math.min(1,Math.max(0,progress))*length;let i=1;while(i<samples.length-1&&samples[i].length<target)i++;const a=samples[i-1],b=samples[i],f=(target-a.length)/(b.length-a.length||1);return{x:a.x+(b.x-a.x)*f,y:a.y+(b.y-a.y)*f,angle:a.angle+(b.angle-a.angle)*f}}}
}
