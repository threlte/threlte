<script lang="ts">
  import { useStage, useTask, useThrelte, watch } from '@threlte/core'
  import { ThreePerf } from 'three-perf'
  import type { PerfMonitorProps } from './PerfMonitor'
  import { onDestroy } from 'svelte'
  import { writable } from 'svelte/store'

  type $$Props = PerfMonitorProps
  type $$PropsWithDefaults = Required<$$Props>

  export let domElement: $$PropsWithDefaults['domElement'] = document.body
  export let logsPerSecond: $$PropsWithDefaults['logsPerSecond'] = 10
  export let showGraph: $$PropsWithDefaults['showGraph'] = true
  export let memory: $$PropsWithDefaults['memory'] = true
  export let enabled: $$PropsWithDefaults['enabled'] = true
  export let visible: $$PropsWithDefaults['visible'] = true
  export let actionToCallUI: $$PropsWithDefaults['actionToCallUI'] = ''
  export let guiVisible: $$PropsWithDefaults['guiVisible'] = false
  export let backgroundOpacity: $$PropsWithDefaults['backgroundOpacity'] = 0.7
  export let scale: $$PropsWithDefaults['scale'] = 1
  export let anchorX: $$PropsWithDefaults['anchorX'] = 'left'
  export let anchorY: $$PropsWithDefaults['anchorY'] = 'top'

  const { renderer, renderStage, mainStage } = useThrelte()

  let perf: ThreePerf

  // Has to be fully re-initialized if dom element changes
  const domElementStore = writable<typeof domElement>(domElement)
  $: domElementStore.set(domElement)
  watch([domElementStore], ([domElement]) => {
    if (perf) perf.dispose()
    perf = new ThreePerf({
      domElement: domElement || document.body,
      renderer: renderer
    })
  })

  $: perf.logsPerSecond = logsPerSecond
  $: perf.showGraph = showGraph
  $: perf.memory = memory
  $: perf.enabled = enabled
  $: perf.visible = visible
  $: perf.actionToCallUI = actionToCallUI
  $: perf.guiVisible = guiVisible
  $: perf.backgroundOpacity = backgroundOpacity
  $: perf.scale = scale
  $: perf.anchorX = anchorX
  $: perf.anchorY = anchorY

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
