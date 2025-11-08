<script lang="ts">
  import { useStage, useTask, useThrelte } from '@threlte/core'
  import { ThreePerf } from 'three-perf'
  import type { PerfMonitorProps } from './types.js'

  let {
    domElement = document.body,
    logsPerSecond = 10,
    showGraph = true,
    memory = true,
    enabled = true,
    visible = true,
    actionToCallUI = '',
    guiVisible = false,
    backgroundOpacity = 0.7,
    scale = 1,
    anchorX = 'left',
    anchorY = 'top'
  }: PerfMonitorProps = $props()

  const { renderer, renderStage, mainStage } = useThrelte()

  let perf: ThreePerf

  $effect.pre(() => {
    perf = new ThreePerf({
      domElement,
      renderer
    })
    return () => perf.dispose()
  })

  $effect.pre(() => {
    perf.logsPerSecond = logsPerSecond
    perf.showGraph = showGraph
    perf.memory = memory
    perf.enabled = enabled
    perf.visible = visible
    perf.actionToCallUI = actionToCallUI
    perf.guiVisible = guiVisible
    perf.backgroundOpacity = backgroundOpacity
    perf.scale = scale
    perf.anchorX = anchorX
    perf.anchorY = anchorY
  })

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
