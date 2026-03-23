<script lang="ts">
  import type { Props } from '@threlte/core'
  import { T } from '@threlte/core'
  import { MarchingPlane } from './MarchingPlane'

  let { children, ...props }: Props<MarchingPlane> = $props()

  const plane = new MarchingPlane()
</script>

<T
  is={plane}
  {...props}
>
  {@render children?.({ ref: plane })}
</T>
