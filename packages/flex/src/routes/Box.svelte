<script lang="ts">
  import { T } from '@threlte/core'
  import { Edges } from '@threlte/extras'
  import { DoubleSide } from 'three'

  export let color: string = 'white'
  export let height = 1
  export let width = 1
  export let depth = 0.5

  let hovering = false
</script>

<T.Mesh
  on:pointerenter={() => (hovering = true)}
  on:pointerleave={() => (hovering = false)}
>
  <T.BoxGeometry args={[width, height, depth]} />
  <T.MeshBasicMaterial
    color={hovering ? 'red' : color}
    transparent
    opacity={0.3}
  />
</T.Mesh>
