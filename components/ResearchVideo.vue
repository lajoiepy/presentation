<script setup>
import { assetUrl } from '../lib/asset-url'
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import { useNav, useSlideContext, useIsSlideActive } from '@slidev/client'

const props=defineProps({src:String,poster:String,alt:{type:String,default:'Aperçu de la vidéo de recherche'},playbackRate:{type:Number,default:1}})
const video=ref(null),reduced=ref(false),manual=ref(false)
const active=useIsSlideActive(),{isPrintMode}=useNav(),{$renderContext}=useSlideContext()
const still=computed(()=>isPrintMode.value||reduced.value||!['slide','presenter'].includes($renderContext.value))
let stop,media
function preference(){reduced.value=media.matches}
function update(){
 const el=video.value
 if(!el)return
 el.pause()
 el.currentTime=0
 el.playbackRate=props.playbackRate
 if(active.value&&!still.value)el.play().catch(error=>{
  // Rapid slide navigation may cancel a pending play request normally.
  if(error.name!=='AbortError')manual.value=true
 })
}
watch(()=>props.playbackRate,rate=>{if(video.value)video.value.playbackRate=rate})
onMounted(()=>{
 media=matchMedia('(prefers-reduced-motion: reduce)')
 preference();media.addEventListener('change',preference)
 stop=watch([active,still,video],update,{immediate:true,flush:'post'})
})
onBeforeUnmount(()=>{stop?.();video.value?.pause();media?.removeEventListener('change',preference)})
</script>

<template>
 <img v-if="still" :src="assetUrl(props.poster)" :alt="props.alt" class="research-video" />
 <video v-else ref="video" class="research-video" :src="assetUrl(props.src)" :poster="assetUrl(props.poster)" :aria-label="props.alt" :controls="manual" muted loop playsinline preload="auto" />
</template>
