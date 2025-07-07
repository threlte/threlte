<script lang="ts">
  import { T } from '@threlte/core'

  let { object3d } = $props()
</script>

<T
  is={object3d}
  name="child"
/>

<T.BoxHelper args={[object3d, 'red']} />
