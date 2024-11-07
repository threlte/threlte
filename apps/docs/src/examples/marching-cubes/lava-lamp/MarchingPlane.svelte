<script lang="ts">
  import type { Props } from '@threlte/core'
  import { T } from '@threlte/core'
  import { MarchingPlane } from './MarchingPlane'

  type MarchingPlaneProps = Props<MarchingPlane>

  let { ref = $bindable(), children, ...props }: MarchingPlaneProps = $props()

  const plane = new MarchingPlane()
</script>

<T
  is={plane}
  bind:ref
  {...props}
>
  {@render children?.({ ref: plane })}
</T>
