import { spawnSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'
mkdirSync('output/pdf',{recursive:true})
const r=spawnSync('node_modules/.bin/slidev',['export','slides.md','--output','output/pdf/mobilite-autonome.pdf','--dark','--per-slide','--wait','1500','--timeout','60000'],{stdio:'inherit'})
process.exitCode=r.status||0
