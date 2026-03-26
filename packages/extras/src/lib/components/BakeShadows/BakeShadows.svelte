<script lang="ts">
  import { useThrelte } from '@threlte/core'

  const { renderer } = useThrelte()

  $effect(() => {
    if ($effect.pending() > 0) return

    const { autoUpdate } = renderer.shadowMap

    renderer.shadowMap.autoUpdate = false
    renderer.shadowMap.needsUpdate = true

    return () => {
      renderer.shadowMap.autoUpdate = autoUpdate
      renderer.shadowMap.needsUpdate = true
    }
  })
</script>
