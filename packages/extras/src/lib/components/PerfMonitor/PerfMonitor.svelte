<script lang="ts">
  import { useStage, useTask, useThrelte } from '@threlte/core'
  import { ThreePerf } from 'three-perf'
  import type { PerfMonitorProps } from './PerfMonitor'

  type $$Props = Required<PerfMonitorProps>

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

  const perf = new ThreePerf({
    anchorX,
    anchorY,
    domElement: document.body,
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
</script>
