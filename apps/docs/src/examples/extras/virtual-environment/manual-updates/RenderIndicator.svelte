<script lang="ts">
  import { useStage, useTask, useThrelte } from '@threlte/core'
  import { WaveformMonitor } from 'svelte-tweakpane-ui'

  const { shouldRender, renderStage } = useThrelte()

  const afterRenderStage = useStage('after-render', {
    after: renderStage
  })

  let log = $state.raw(new Array(100).fill(0))

  useTask(
    () => {
      const [, ...rest] = log
      log = [...rest, +shouldRender()]
    },
    { autoInvalidate: false, stage: afterRenderStage }
  )
</script>

<WaveformMonitor
  label="Render Activity"
  value={log}
  min={-1}
  max={2}
/>
