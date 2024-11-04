<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { useSuspense } from '@threlte/extras'
  import { fromStore } from 'svelte/store'

  const suspended = fromStore(useSuspense().suspended)

  const { renderer } = useThrelte()

  $effect(() => {
    if (!suspended.current) {
      renderer.shadowMap.autoUpdate = false
      renderer.shadowMap.needsUpdate = true
    }
    return () => {
      renderer.shadowMap.autoUpdate = true
      renderer.shadowMap.needsUpdate = true
    }
  })
</script>
