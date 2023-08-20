<script lang="ts">
  import { T } from '@threlte/core'
  import { OrbitControls, Suspense, Text } from '../lib'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.PerspectiveCamera>
<T.DirectionalLight />
<T.AmbientLight />

<Suspense>
  <Text
    text="Hello World"
    anchorX="50%"
    anchorY="50%"
    color="black"
  />
  <svelte:fragment slot="fallback">
    <T.Mesh>
      <T.MeshStandardMaterial
        transparent
        color="hotpink"
      />
      <T.BoxGeometry />
    </T.Mesh>
  </svelte:fragment>
</Suspense>
