<script lang="ts">
  import { T } from '@threlte/core'
  import { Mesh } from 'three'
</script>

<T
  is={Mesh}
  {...$$restProps}
>
  <slot />
</T>
