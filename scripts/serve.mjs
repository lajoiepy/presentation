import http from 'node:http'
import { createReadStream, existsSync, statSync } from 'node:fs'
import { resolve, extname, sep } from 'node:path'
const root=resolve('dist'),port=Number(process.env.PORT||3032)
const basePath='/' + (process.env.BASE_PATH||'').replace(/^\/+|\/+$/g,'')
const prefix=basePath==='/'?'':basePath
const types={'.html':'text/html','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.mp4':'video/mp4','.woff':'font/woff','.woff2':'font/woff2','.pdf':'application/pdf','.json':'application/json'}
if(!existsSync(root)){console.error('Build first: npm run build');process.exit(1)}
http.createServer((req,res)=>{
  let file
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)
    if(prefix && pathname===prefix){res.writeHead(302,{Location:prefix+'/'}).end();return}
    if(prefix && !pathname.startsWith(prefix+'/')){res.writeHead(404).end('Not found');return}
    file=resolve(root,'.'+pathname.slice(prefix.length))
  }catch{res.writeHead(400).end();return}
  if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403).end();return}
  if(existsSync(file)&&statSync(file).isDirectory())file=resolve(file,'index.html')
  if(!existsSync(file)){res.writeHead(404).end('Not found');return}
  const {size}=statSync(file),type=types[extname(file)]||'application/octet-stream'
  const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/)
  if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),size-1):size-1;if(start>=size||end<start){res.writeHead(416,{'Content-Range':`bytes */${size}`}).end();return}res.writeHead(206,{'Content-Type':type,'Accept-Ranges':'bytes','Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});createReadStream(file,{start,end}).pipe(res)}
  else{res.writeHead(200,{'Content-Type':type,'Content-Length':size,'Accept-Ranges':'bytes'});createReadStream(file).pipe(res)}
}).listen(port,'127.0.0.1',()=>console.log(`Mobilité autonome: http://localhost:${port}${prefix}/`))
