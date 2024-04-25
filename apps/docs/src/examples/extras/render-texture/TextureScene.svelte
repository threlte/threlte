<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { interactivity, Float } from '@threlte/extras'
  import type { Mesh } from 'three'

  let ref: Mesh

  useTask((delta) => {
    ref.rotation.x += delta
    ref.rotation.y += delta
  })

  interactivity()

  let hovered = $state(false)
</script>

<T.Color
  attach="background"
  args={['orange']}
/>

<T.OrthographicCamera
  position={[1, 1, 1]}
  makeDefault
  zoom={200}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
/>

<T.DirectionalLight />
<T.AmbientLight />

<Float speed={10}>
  <T.Mesh
    bind:ref
    on:pointerenter={() => (hovered = true)}
    on:pointerleave={() => (hovered = false)}
    scale={hovered ? 1.1 : 1}
  >
    <T.DodecahedronGeometry />
    <T.MeshStandardMaterial color="#5de4c7" />
  </T.Mesh>
</Float>
