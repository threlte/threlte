<script lang="ts">
  import type { Props } from '@threlte/core'
  import { T } from '@threlte/core'
  import { MarchingPlane } from './MarchingPlane'

  type MarchingPlaneProps = Props<MarchingPlane>

  let { ref = $bindable(), children, ...props }: MarchingPlaneProps = $props()
</script>

<T
  is={MarchingPlane}
  bind:ref
  {...props}
>
  {@render children?.({ ref })}
</T>
