<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { useSuspense } from '@threlte/extras'

  const { suspended } = useSuspense()

  const { renderer } = useThrelte()

  $effect(() => {
    if (suspended.current) {
      return
    }

    const { autoUpdate } = renderer.shadowMap

    renderer.shadowMap.autoUpdate = false
    renderer.shadowMap.needsUpdate = true

    return () => {
      renderer.shadowMap.autoUpdate = autoUpdate
      renderer.shadowMap.needsUpdate = true
    }
  })
</script>
