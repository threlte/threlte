<script lang="ts">
  import { T } from '@threlte/core'
</script>

<T.Group {...$$restProps}>
  <!-- Correct rotation -->
  <T.Group rotation.x={(90 * Math.PI) / 180}>
    <slot />
  </T.Group>
</T.Group>
