<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { useSuspense } from '@threlte/extras'
  import { fromStore } from 'svelte/store'

  const suspended = fromStore(useSuspense().suspended)

  const { renderer } = useThrelte()

  $effect.pre(() => {
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
