<script lang="ts">
  import { MarchingCube } from './MarchingCube'
  import { T } from '@threlte/core'

  import type { MarchingCubeProps } from './types'

  let { children, ...props }: MarchingCubeProps = $props()

  const cube = new MarchingCube()
</script>

<T
  is={cube}
  {...props}
>
  {@render children?.({ ref: cube })}
</T>
