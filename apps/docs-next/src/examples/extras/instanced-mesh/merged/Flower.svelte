<script lang="ts">
  import type { Instance } from '@threlte/extras'
  import { T } from '@threlte/core'

  export let Stem: typeof Instance
  export let Blossom: typeof Instance
</script>

<T.Group {...$$restProps}>
  <!-- Correct rotation -->
  <T.Group rotation.x={(90 * Math.PI) / 180}>
    <Stem />
    <Blossom />
  </T.Group>
</T.Group>
