import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useNav, useSlideContext, useIsSlideActive } from '@slidev/client'
export const ease = (x) => { x = Math.max(0, Math.min(1, x)); return x*x*(3-2*x) }
export const ramp = (t,a,b) => ease((t-a)/(b-a))
// Every pose is evaluated from absolute loop time: seeking and restarting cannot accumulate drift.
// Default to twice real time; a scene can override its rate without changing its stages or snapshots.
export function useTimeline(duration=20, posterTime=16, playbackRate=2) {
  const { isPrintMode } = useNav(), { $renderContext } = useSlideContext()
  const active = useIsSlideActive(), fallback = ref(false), reduced = ref(false), time = ref(posterTime)
  const staticMode = computed(()=>isPrintMode.value || reduced.value || fallback.value || !['slide','presenter'].includes($renderContext.value))
  let frame=0, origin=0, stop, media, test=false, held=false
  const opacity=computed(()=>staticMode.value?1:Math.min(ramp(time.value,0,.7),1-ramp(time.value,duration-.8,duration)))
  function tick(now){if(!active.value||staticMode.value||held)return;time.value=(Math.max(0,now-origin)*playbackRate/1000)%duration;frame=requestAnimationFrame(tick)}
  function start(){cancelAnimationFrame(frame);if(staticMode.value){time.value=posterTime;return}time.value=0;held=false;origin=performance.now();if(active.value)frame=requestAnimationFrame(tick)}
  function seek(e){if(!test||!active.value)return;cancelAnimationFrame(frame);held=true;time.value=Math.max(0,Math.min(duration-.001,Number(e.detail)))}
  function resume(){if(test&&active.value)start()}
  function preference(){reduced.value=media.matches}
  onMounted(()=>{media=matchMedia('(prefers-reduced-motion: reduce)');preference();media.addEventListener('change',preference);test=new URLSearchParams(location.search).has('animationTest');window.addEventListener('animation-seek',seek);window.addEventListener('animation-resume',resume);stop=watch([active,staticMode],start,{immediate:true})})
  onUnmounted(()=>{cancelAnimationFrame(frame);stop?.();media?.removeEventListener('change',preference);window.removeEventListener('animation-seek',seek);window.removeEventListener('animation-resume',resume)})
  return {time,active,staticMode,opacity,duration,freeze:()=>{fallback.value=true}}
}
