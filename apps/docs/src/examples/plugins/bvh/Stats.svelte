<script lang="ts">
  import Stats from 'three/examples/jsm/libs/stats.module.js'
  import { useStage, useTask, useThrelte } from '@threlte/core'

  const { dom, renderStage } = useThrelte()

  const stats = new Stats()
  dom.appendChild(stats.dom)
  $effect(() => {
    return () => {
      dom.removeChild(stats.dom)
    }
  })

  const afterRenderStage = useStage('after-render', {
    after: renderStage
  })

  useTask(
    () => {
      stats.update()
    },
    {
      stage: afterRenderStage
    }
  )
</script>
