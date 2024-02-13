<script lang="ts">
  import { useStage, useTask, useThrelte, watch } from '@threlte/core'
  import { ThreePerf } from 'three-perf'
  import type { PerfMonitorProps } from './PerfMonitor'
  import { onDestroy } from 'svelte'
  import { writable } from 'svelte/store'

  type $$Props = PerfMonitorProps

  export let domElement: $$Props['domElement'] = undefined
  export let logsPerSecond: $$Props['logsPerSecond'] = 10
  export let showGraph: $$Props['showGraph'] = true
  export let memory: $$Props['memory'] = true
  export let enabled: $$Props['enabled'] = true
  export let visible: $$Props['visible'] = true
  export let actionToCallUI: $$Props['actionToCallUI'] = ''
  export let guiVisible: $$Props['guiVisible'] = false
  export let backgroundOpacity: $$Props['backgroundOpacity'] = 0.7
  export let scale: $$Props['scale'] = 1
  export let anchorX: $$Props['anchorX'] = 'left'
  export let anchorY: $$Props['anchorY'] = 'top'

  const { renderer, renderStage, mainStage } = useThrelte()

  let perf: ThreePerf

  // Has to be fully re-initialized if dom element changes
  const domElementStore = writable(domElement)
  watch([domElementStore], ([domElement]) => {
    perf = new ThreePerf({
      anchorX,
      anchorY,
      domElement: domElement || document.body,
      renderer: renderer,
      logsPerSecond,
      showGraph,
      memory,
      enabled,
      visible,
      actionToCallUI,
      guiVisible,
      backgroundOpacity,
      scale
    })
  })

  $: perf && (perf.logsPerSecond = logsPerSecond || 10)
  $: perf && (perf.showGraph = showGraph ? true : false)
  $: perf && (perf.memory = memory ? true : false)
  $: perf && (perf.enabled = enabled ? true : false)
  $: perf && (perf.visible = visible ? true : false)
  $: perf && (perf.actionToCallUI = actionToCallUI || '')
  $: perf && (perf.guiVisible = guiVisible ? true : false)
  $: perf && (perf.backgroundOpacity = backgroundOpacity || 0.7)
  $: perf && (perf.scale = scale !== undefined ? scale : 1)
  $: perf && (perf.anchorX = anchorX || 'left')
  $: perf && (perf.anchorY = anchorY || 'top')

  useTask(
    () => {
      perf.begin()
    },
    {
      stage: useStage('monitor-begin', {
        before: mainStage
      })
    }
  )

  useTask(
    () => {
      perf.end()
    },
    {
      stage: useStage('monitor-end', {
        after: renderStage
      })
    }
  )

  onDestroy(() => {
    if (perf) perf.dispose()
  })
</script>
