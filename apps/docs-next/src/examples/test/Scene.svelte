<script lang="ts">
  import { T } from '@threlte/core'
  import { EventMap, interactivity } from '@threlte/extras'
  import { spring } from 'svelte/motion'

  interactivity()

  let color = 'blue'

  const scale = spring(1)
</script>

<T.OrthographicCamera
  zoom={80}
  position={[5, 5, 5]}
  makeDefault
  on:create={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<T.DirectionalLight position={[1, 2, 5]} />

<T.Mesh
  on:pointerenter={(e) => {
    color = 'red'
  }}
  on:pointerleave={(e) => {
    color = 'blue'
  }}
  on:pointerdown={(e) => {
    $scale = 2
  }}
  on:pointerup={(e) => {
    $scale = 1
  }}
  scale={$scale}
>
  <T.BoxGeometry />
  <T.MeshStandardMaterial {color} />
</T.Mesh>
