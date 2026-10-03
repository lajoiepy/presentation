<script setup>
import { assetUrl } from '../lib/asset-url'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import * as T from 'three'
import { makeCity, makeSwarm, cityWorld } from '../lib/world'
const props=defineProps({time:{default:0},kind:{default:'intro'},staticMode:Boolean,active:{default:true}})
const emit=defineEmits(['unavailable'])
function unavailable(){failed.value=true;emit('unavailable')}
const wrapper=ref(),canvas=ref(),failed=ref(false),ready=ref(false)
let renderer,scene,camera,update,resizeObserver,stop
function draw(){if(!renderer||!props.active)return;update?.(props.time);renderer.render(scene,camera)}
function resize(){if(!renderer)return;const w=wrapper.value.clientWidth,h=wrapper.value.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);if(camera.isPerspectiveCamera){camera.aspect=w/h}else{const a=w/h,v=Math.max(7.8,11.5/a);camera.left=-v*a;camera.right=v*a;camera.top=v;camera.bottom=-v}camera.updateProjectionMatrix();draw()}
onMounted(()=>{
 if(props.staticMode)return
 try{
  renderer=new T.WebGLRenderer({canvas:canvas.value,antialias:true,alpha:true,preserveDrawingBuffer:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=T.PCFSoftShadowMap;renderer.outputColorSpace=T.SRGBColorSpace;renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25
  scene=new T.Scene();const ambient=new T.HemisphereLight(0xc5e6ff,0x142939,2);scene.add(ambient);const sun=new T.DirectionalLight(0xffecd2,2.3);sun.position.set(-5,16,8);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);Object.assign(sun.shadow.camera,{left:-15,right:15,top:15,bottom:-15,near:.1,far:45});sun.shadow.bias=-.002;sun.shadow.normalBias=.03;scene.add(sun);scene.userData={sun,ambient}
  if(props.kind==='street'){camera=new T.PerspectiveCamera(65,1,.1,100);camera.position.set(-7.4,1.1,.2);camera.lookAt(5,1.1,-.4);cityWorld(scene)}
  else{camera=new T.OrthographicCamera(-13,13,10,-10,.1,100);camera.position.set(13,17,20);camera.lookAt(0,0,0);update=props.kind==='swarm'?makeSwarm(scene):makeCity(scene,props.kind)}
  resize();resizeObserver=new ResizeObserver(resize);resizeObserver.observe(wrapper.value);stop=watch(()=>[props.time,props.active],draw,{immediate:true});ready.value=true
 }catch(e){console.warn('Static scene fallback:',e.message);unavailable()}
})
onUnmounted(()=>{stop?.();resizeObserver?.disconnect();scene?.traverse(o=>{o.geometry?.dispose();if(Array.isArray(o.material))o.material.forEach(m=>m.dispose());else o.material?.dispose()});renderer?.dispose()})
</script>
<template><div ref="wrapper" class="world-scene" :data-ready="ready" :data-kind="kind"><img v-if="staticMode||failed" :src="assetUrl(`media/posters/${kind}.png`)" :alt="kind==='swarm'?'Cartes locales de trois robots alignées':'Maquette urbaine avec véhicule, bâtiments et repères de localisation'"/><canvas v-else ref="canvas" role="img" :aria-label="kind==='swarm'?'Trois robots construisent puis alignent leurs cartes locales':'Scène urbaine synthétique en trois dimensions'" @webglcontextlost.prevent="unavailable"/></div></template>
