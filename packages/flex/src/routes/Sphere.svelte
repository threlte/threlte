<script lang="ts">
  import { T } from '@threlte/core'

  export let color: string = 'white'

  export let radius: number = 1

  let hovering = false
</script>

<T.Mesh
  on:pointerenter={() => (hovering = true)}
  on:pointerleave={() => (hovering = false)}
>
  <T.SphereGeometry args={[radius]} />
  <T.MeshBasicMaterial
    color={hovering ? 'red' : color}
    transparent
    opacity={0.3}
  />
</T.Mesh>
