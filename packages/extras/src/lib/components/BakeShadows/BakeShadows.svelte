<!--
@component a drop-in component that freezes shadow map updates

@example
```svelte
<BakeShadows />
```
-->
<script lang="ts">
  import { observe, useThrelte } from '@threlte/core'
  import { useSuspense } from '@threlte/extras'

  const { renderer } = useThrelte()
  const { suspended } = useSuspense()

  observe(
    () => [suspended],
    ([suspended]) => {
      if (!suspended) {
        renderer.shadowMap.autoUpdate = false
        renderer.shadowMap.needsUpdate = true
      }
      return () => {
        renderer.shadowMap.autoUpdate = true
        renderer.shadowMap.needsUpdate = true
      }
    }
  )
</script>
