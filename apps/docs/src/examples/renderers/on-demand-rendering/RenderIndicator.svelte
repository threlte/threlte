<script lang="ts">
  import { useStage, useTask, useThrelte } from '@threlte/core'
  import { Pane, WaveformMonitor } from 'svelte-tweakpane-ui'

  const { shouldRender, renderStage } = useThrelte()

  const afterRenderStage = useStage('after-render', {
    after: renderStage
  })

  let value = $state.raw<number[]>(Array(100).fill(0))

  useTask(
    () => {
      value = [...value.slice(1), shouldRender() ? 1 : 0]
    },
    {
      autoInvalidate: false,
      stage: afterRenderStage
    }
  )
</script>

<Pane
  title="Rendering Activity"
  position="fixed"
>
  <WaveformMonitor
    {value}
    min={-1}
    max={2}
  />
</Pane>
