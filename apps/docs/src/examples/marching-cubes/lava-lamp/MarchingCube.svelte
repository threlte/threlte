<script lang="ts">
  import { MarchingCube } from './MarchingCube'
  import { T } from '@threlte/core'

  import type { MarchingCubeProps } from './types'

  let { ref = $bindable(), children, ...props }: MarchingCubeProps = $props()

  const cube = new MarchingCube()
</script>

<T
  is={cube}
  bind:ref
  {...props}
>
  {@render children?.({ ref: cube })}
</T>
