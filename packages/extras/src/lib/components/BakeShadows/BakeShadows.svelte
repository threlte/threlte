<script lang="ts">
  import { useThrelte } from '@threlte/core'

  import { useSuspense } from '@threlte/extras'

  const { suspended } = useSuspense()

  const { renderer } = useThrelte()

  $effect(() => {
    if (!$suspended) {
      renderer.shadowMap.autoUpdate = false
      renderer.shadowMap.needsUpdate = true
    }
    return () => {
      renderer.shadowMap.autoUpdate = true
      renderer.shadowMap.needsUpdate = true
    }
  })
</script>
