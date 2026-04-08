<script lang="ts">
  import { useThrelte } from '@threlte/core'

  let { children, onsuspend, onload } = $props()

  const { renderer, scene, camera } = useThrelte()

  let suspended = $state(true)

  $effect(() => {
    if ($effect.pending() === 0) {
      renderer.compileAsync(scene, camera.current).then(() => {
        suspended = false
        onload?.()
      })
      return
    }

    onsuspend?.()
  })
</script>

{@render children?.(suspended)}
