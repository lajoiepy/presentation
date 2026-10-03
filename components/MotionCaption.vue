<script setup>
import { computed } from 'vue'
const props=defineProps({time:Number,duration:{default:20},labels:Array,starts:Array,simultaneous:Boolean})
const index=computed(()=>props.starts ? Math.max(0,props.starts.filter(t=>props.time>=t).length-1) : Math.min(props.labels.length-1,Math.floor(props.time/(props.duration-3)*props.labels.length)))
</script>
<template><div class="motion-caption"><div class="motion-phases"><span v-for="(label,i) in labels" :key="label" :class="{current:simultaneous||i===index,passed:!simultaneous&&i<index}"><b>{{simultaneous?'●':String(i+1).padStart(2,'0')}}</b>{{label}}</span></div><div class="motion-track"><i :style="{width:`${Math.min(100,time/(duration-1)*100)}%`}"/></div></div></template>
