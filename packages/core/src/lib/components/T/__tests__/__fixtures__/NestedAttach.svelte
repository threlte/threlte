<script lang="ts">
  import { T } from '@threlte/core'

  let { light, camera } = $props()
</script>

<T is={light}>
  <T
    is={camera}
    attach="shadow.camera"
  />
</T>
