<script lang="ts">
  import type { Props } from '@threlte/core'
  import { MarchingCube } from './MarchingCube'
  import { T } from '@threlte/core'

  type MarchingCubeProps = Props<MarchingCube>

  let { ref = $bindable(), children, ...props }: MarchingCubeProps = $props()
</script>

<T
  is={MarchingCube}
  bind:ref
  {...props}
>
  {@render children?.({ ref })}
</T>
