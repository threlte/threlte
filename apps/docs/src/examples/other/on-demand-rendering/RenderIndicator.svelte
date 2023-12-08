<script lang="ts">
  import { useStage, useTask, useThrelte } from '@threlte/core'
  import { Pane, WaveformMonitor } from 'svelte-tweakpane-ui'

  const { shouldRender, renderStage } = useThrelte()

  const afterRenderStage = useStage('after-render', {
    after: renderStage
  })

  let log = Array(100).fill(0)

  useTask(
    () => {
      log = update(log)
    },
    {
      autoInvalidate: false,
      stage: afterRenderStage
    }
  )

  function update(log: number[]) {
    log.shift()
    log.push(shouldRender() ? 1 : 0)
    return log
  }
</script>

<Pane
  title="Rendering Activity"
  position="fixed"
>
  <WaveformMonitor
    value={log}
    min={-1}
    max={2}
  />
</Pane>
