<script lang="ts">
  import { T, useThrelte } from '@threlte/core'

  const { renderer, invalidate } = useThrelte()
</script>

<T.Mesh>
  <T.BoxGeometry />
  <T.MeshStandardMaterial>
    <T.Color
      args={['#ff0000']}
      attach="color"
    />
  </T.MeshStandardMaterial>
</T.Mesh>

<T.DirectionalLight
  position.y={5}
  position.x={3}
/>

<T.PerspectiveCamera
  makeDefault
  let:ref={camera}
  position.y={10}
  position.x={10}
>
  <T.OrbitControls
    args={[camera, renderer.domElement]}
    on:change={invalidate}
  />
</T.PerspectiveCamera>
