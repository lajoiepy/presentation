<script setup>
import { computed } from 'vue'
import { useTimeline } from '../composables/useTimeline'
const props=defineProps({mode:{default:'intro'},playbackRate:{type:Number,default:2}})
const {time,opacity,active,staticMode,freeze}=useTimeline(props.mode==='questions'?18:20,16,props.playbackRate)
const labels=computed(()=>({intro:[],adas:[],conditions:[],questions:['Percevoir','Actualiser','Coopérer']}[props.mode]))
</script>
<template><div class="motion-scene city-map" :data-time="time" :data-static="staticMode"><div class="scene-tag">{{mode==='conditions'?'Conditions réelles · illustration':mode==='questions'?'Véhicules ↔ infrastructures':''}}</div><div class="scene-body" :style="{opacity}"><WorldScene @unavailable="freeze" :key="String(staticMode)" :kind="mode" :time="time" :static-mode="staticMode" :active="active"/></div><div v-if="mode==='intro'||mode==='adas'" class="scene-legend"><span style="color:#e8f0f4"></span><span class="cyan"></span></div><div v-if="mode==='conditions'&&time>13" class="map-warning"></div><MotionCaption :time="time" :duration="mode==='questions'?18:20" :starts="mode==='adas'?[0,7,11]:undefined" :labels="labels"/></div></template>
