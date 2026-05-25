<script lang="ts">
  import { T } from '@threlte/core'
  import type { BoxGeometry } from 'three'

  let ref = $state.raw<BoxGeometry>()
  let width = $state(1)

  $effect(() => {
    if (!ref) return

    width = 2
  })
</script>

<T.BoxGeometry
  bind:ref
  args={[width, 1, 1]}
/>
